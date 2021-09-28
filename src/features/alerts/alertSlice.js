import {createSlice} from '@reduxjs/toolkit'
import moment from "moment"

const alertSlice = createSlice({
    name: 'alerts',
    initialState: [],
    reducers: {
        alertAdd: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.push({date: moment().format('YYYY-MM-DD HH:mm:ss'), ...action.payload});
        },
        alertsClear: state => {
            state = [];
        },
        alertsRemoveFirst: state => {
            state.pop();
        }
    }
})


// Action creators are generated for each case reducer function
export const {alertAdd, alertsClear, alertsRemoveFirst} = alertSlice.actions

export default alertSlice.reducer