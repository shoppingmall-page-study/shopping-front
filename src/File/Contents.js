import React, { useEffect } from "react";
import './Contents.css'
import Product from "./Product";
import getProducts from "../Service/Fetcher";
import Hafter from "../Header/HeaderAfter";

function Contents({products, setProducts, convertPrice}){
    useEffect(()=>{
       getProducts().then((response)=>{
        setProducts(response.data.products);
       })
    }, [setProducts]);

    //서버 정상작동 할 때
    // useEffect(()=>{
    //     getProducts().then((res) => {
    //         setProducts(res.data.data);
    //     })
    // }, [setProducts])

    return(
        <div className="flex_wrap">
            {products.map((product) => {
                return <Product key={`key-${product.id}`} product={product} convertPrice={convertPrice}/>
            })}
        </div>
    );        
}
export default Contents;