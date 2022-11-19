import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import {Provider, useSelect, useDispatch, connect} from 'react-redux';
import { userGet } from './Api/ApiService';
import store from './app/store';
// import { userGet } from './Api/ApiService';

// function reducer(currenState, action){
//   if(currenState === undefined){
//     return{
//       number: 1
//     }
//   }
//   const newState = {...currenState}
//   if(action.type === 'PLUS'){
//     newState.number++;
//   }
//   return newState;
// }
// const store = createStore(reducer)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
        <App/>
    </React.StrictMode>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
