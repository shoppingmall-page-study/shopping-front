import React from "react";
import Hbefore from "../Header/HeaderBefore";
import Contents from "../File/Contents";
import "./home.css";

function BHome({products, setProducts, convertPrice}){
    return(
        <div>
            <header className="Header">
                <Hbefore/>
            </header>
            <div className="Content">
                <div className="mt">
                <Contents products={products} setProducts={setProducts} convertPrice={convertPrice}/>
                </div>
            </div>
        </div>
    );        
}
export default BHome;