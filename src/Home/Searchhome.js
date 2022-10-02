// import React, { useEffect, useState } from "react";
// import Contents from '../File/Contents'
import Hafter from "../Header/HeaderAfter";
import SearchContents from "../File/SearchContents";

function Searchhome({ convertPrice, cart, setCart ,searchProducts ,setSearchProducts}){

    // 변수 하나 설정해수 
    // <Hafter> 에 보내고 set 으로 여기서 다시 받고 


    // 1. setSearch 를 통해 Hafter에서 post요청으로 생성한 데이터를 받음
    return(
        <div>
            <header className="Header">
                <Hafter cart={cart} setCart={setCart} /> 
                
            </header>
            <div className="Content">
                <SearchContents  convertPrice={convertPrice} searchProducts={searchProducts} setSearchProducts={setSearchProducts} />
            </div>
        </div>
    );        
}
export default Searchhome;