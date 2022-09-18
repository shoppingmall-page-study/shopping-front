import React, { useEffect } from "react";
import Contents from '../File/Contents'
import Hafter from "../Header/HeaderAfter";
import "./home.css";

function AHome({products, setProducts, convertPrice, cart, setCart}){
    console.log(cart)
    return(
        <div>
            <header className="Header">
                <Hafter cart={cart} setCart={setCart}/>
            </header>
            <div className="Content">
                <div className="mt">
                <Contents products={products} setProducts={setProducts} convertPrice={convertPrice}/>
                </div>
            </div>
        </div>
    );        
}
export default AHome;