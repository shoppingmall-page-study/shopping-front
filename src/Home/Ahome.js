import React, { useEffect } from "react";
import Contents from '../File/Contents'
import Hafter from "../Header/HeaderAfter";

function AHome({products, setProducts, convertPrice, cart, setCart}){
    return(
        <div>
            <header className="Header">
                <Hafter cart={cart} setCart={setCart}/>
            </header>
            <div>
                <Contents products={products} setProducts={setProducts} convertPrice={convertPrice}/>
            </div>
        </div>
    );        
}
export default AHome;