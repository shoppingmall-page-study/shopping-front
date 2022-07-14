import React from "react";
import Hbefore from "../Header/HeaderBefore";
import Contents from '../File/Contents'

function BHome({products, setProducts, convertPrice}){
    return(
        <div>
            <header className="Header">
                <Hbefore/>
            </header>
            <div>
                <Contents products={products} setProducts={setProducts} convertPrice={convertPrice}/>
            </div>
        </div>
    );        
}
export default BHome;