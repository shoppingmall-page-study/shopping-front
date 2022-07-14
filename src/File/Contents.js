import React, { useEffect } from "react";
import './Contents.css'
import Product from "./Product";
import getProducts from "../Service/Fetcher";
import Hafter from "../Header/HeaderAfter";

function Contents({products, setProducts, convertPrice}){
    useEffect(()=>{
       getProducts().then((data)=>{
        setProducts(data.data.products);
       })
    }, [setProducts]);

    return(
        <div className="flex_wrap">
            {products.map((product) => {
                return <Product key={`key-${product.id}`} product={product} convertPrice={convertPrice}/>
            })}
        </div>
    );        
}
export default Contents;