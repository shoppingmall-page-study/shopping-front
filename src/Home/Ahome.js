// import React, { useEffect } from "react";
import Contents from '../File/Contents'
import Hafter from "../Header/HeaderAfter";
import "./home.css";
// import { cartGet } from "../Api/ApiService";

function AHome({cart, products, setProducts, convertPrice}){
    
    return(
        <div>
            <header className="Header">
                <Hafter cart={cart}/>
            </header>
            <div className="Content">
                <div className="mt">
                <Contents products={products} setProducts={setProducts} convertPrice={convertPrice}/>
                </div>
            </div>
        </div>
        // <Contents products={products} setProducts={setProducts} convertPrice={convertPrice}/>
    );        
}
export default AHome;