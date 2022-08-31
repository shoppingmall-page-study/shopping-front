import React, { useEffect, useState } from "react";
import './Contents.css'
import Product from "./Product";
import getProducts from "../Service/Fetcher";
import Hafter from "../Header/HeaderAfter";
import {  searchPost } from "../Api/ApiService";
import { useParams } from "react-router";

function SearchContents({convertPrice,searchProducts ,setSearchProducts}){
    const params = useParams();
    // useEffect(()=>{
    //    getProducts().then((response)=>{
    //     setProducts(response.data.products);
    //    })
    // }, [setProducts]);
    // serach 를 클릭할시 해당 값을 가지고 이동 한다고 생각하자 
    const[arrlength, setArrlength] = useState();
    
    
    useEffect(()=>{
       
         console.log(params.name);

         searchPost({ searchparam: params.name}).then((response)=>{
            console.log(response.data.data)
            //setSearch(response.data.data)
            if(response.status == 200){
                setSearchProducts(response.data.data);
                setArrlength(response.data.length);

            }
    });
    

        // getProducts().then((res) => {
        //     setProducts(res.data.data);
        // })
    }, [params.name])

    
    return(
        <div>
                <p  className="search_product_count_a">{arrlength}개 상품이 검색되었습니다</p>
        <div className="flex_wrap">
            
            {searchProducts.length === 0 ?
            <div className="not_userReivew"> <p>해당 상품이 존재 하지 않습니다.</p></div>:
            
            searchProducts.map((product) => {
                return <Product key={`key-${product.productId}`} product={product} convertPrice={convertPrice}/>
            })}
        </div>
        </div>
    );        
}
export default SearchContents;