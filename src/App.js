import {useState} from 'react'
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import UserRouter from "./Router";
import TopHeaderNavigator from './Header/TopHeader'

function App() {


  return (
    // <div className="App">
    <BrowserRouter>
      {/* <TopHeaderNavigator cart={cart}/> */}
      <UserRouter/>
    </BrowserRouter>
    // </div>
  );
}

export default App;