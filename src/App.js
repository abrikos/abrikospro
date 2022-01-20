import React from "react";
import Routes from "./Routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import storeRedux from "app/storeRedux";
import API from "app/API"
import {useDispatch} from "react-redux";
import "./App.sass"

function App() {
    const dispatch = useDispatch();
    const api = API(dispatch);
    console.log('STORE', storeRedux.getState())

    return (
        <div className="App">
            <Routes {...api}/>
        </div>
    );
}

export default App;
