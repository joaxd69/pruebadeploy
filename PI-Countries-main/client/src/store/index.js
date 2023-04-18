import { createStore, applyMiddleware} from 'redux';
// import { applyMiddleware} from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import  thunk  from "redux-thunk";
import rootReducer from '../reducer/index';


// export const store = configureStore({ reducer: counterReducer(applyMiddleware(thunk))})

// console.log(store.getState())




export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))