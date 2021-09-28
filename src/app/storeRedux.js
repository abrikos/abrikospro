import {applyMiddleware, combineReducers, createStore} from '@reduxjs/toolkit';
import counter from 'features/counter/counterSlice';
import alerts from "features/alerts/alertSlice";

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

const app = combineReducers({counter,  alerts});
const store = createStore(app, applyMiddleware(logger));


store.subscribe(() => console.log('Store changed',store.getState()))
export default store;