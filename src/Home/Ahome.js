// import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Contents from '../File/Contents'
import Hafter from "../Header/HeaderAfter";
import "./home.css";
import {UserDataAction} from "../features/user/actionCreators"
// import { cartGet } from "../Api/ApiService";

function AHome({cart, setCart, products, setProducts, convertPrice}){
    // const number = useSelector(state => state.number);
    // const dispatch = useDispatch();
    const userData = useSelector(store => store.userData)
    console.log(userData)

   

    return(
        <div>
            <header className="Header">
                <Hafter cart={cart} setCart={setCart}/>
            </header>
            <div className="Content">
                {/* <p>{number}</p> */}
                <p>{userData.id}</p>
                {/* <button onClick={a}>클릭</button> */}
                <div className="mt">
                <Contents products={products} setProducts={setProducts} convertPrice={convertPrice}/>
                </div>
            </div>
        </div>
        // <Contents products={products} setProducts={setProducts} convertPrice={convertPrice}/>
    );        
}
export default AHome;