import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from 'redux'
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';

import App from "./App";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


const todoReducer = (state = {
    taskArray: [],
    reduxHistory: []
}, action) => {
    switch (action.type) {
        case "add":
            state = {
                ...state,
                taskArray: [...state.taskArray, action.payload],
                reduxHistory: [...state.reduxHistory, action.payload]
            };
            break;
        case "remove":
            const removeindex = state.taskArray.indexOf(action.payload)
            state.taskArray.splice(removeindex,1)
            
            state = {
                ...state,
                taskArray: state.taskArray,
                reduxHistory: [...state.reduxHistory, action.payload]
            };
            break;
    }
    return state;
};

const numReducer = (state = {
    num: 0,
}, action) => {
    switch (action.type) {
        case "addnum":
            state = {
                ...state,
                num: state.num + 1
            };
            break;
        case "removenum":
            console.log( state.taskArray)
            state = {
                ...state,
                num: state.num - 1
            };
            break;
    }
    return state;
};

const objReducer = (state = {
    obj: {},
}, action) => {
    switch (action.type) {
        case "addobj":
            state = {
                ...state,
               obj:{...state.obj, [action.payload]: action.payload}
            };
            break;
        case "removeobj":
            let temp = state.obj;
            delete temp[action.payload]
            state = {
                ...state,
                obj: temp
            };
            break;
    }
    return state;
};


export const store = createStore(combineReducers({ todoReducer, numReducer, objReducer }));

store.subscribe(() => {
    console.log("Store updated!", store.getState());
});


const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
