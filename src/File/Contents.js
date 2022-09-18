import React, { useEffect } from "react";
import './Contents.css'
import Product from "./Product";
import getProducts from "../Service/Fetcher";
import Hafter from "../Header/HeaderAfter";
import { productGet } from "../Api/ApiService";
import {render} from "react-dom"

function Contents({products, setProducts, convertPrice}){
    // useEffect(()=>{
    //    getProducts().then((response)=>{
    //     setProducts(response.data.products);
    //    })
    // }, [setProducts]);

    useEffect(()=>{
        productGet().then((res) => {
            setProducts(res.data.data);
    })

        // getProducts().then((res) => {
        //     setProducts(res.data.data);
        // })
    }, [setProducts])

    return(
        <div className="flex_wrap">
            {products.map((product) => {
                return <Product key={`key-${product.productId}`} product={product} convertPrice={convertPrice}/>
            })}
        </div>
    );        
}
export default Contents;