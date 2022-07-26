import React from "react";
import {Route,Routes} from 'react-router-dom'
import Login from "./Login/Login";
import Join from "./Join/Join";
import Hafter from "./Header/HeaderAfter";
import Hbefore from "./Header/HeaderBefore";
import Basket from "./Basket/Basket";
import Goodsup from "./Goodsup/Goodsup";
import Uplist from "./Uplist/Uplist";
import Orderlist from "./Orderlist/Orderlist";
import Bhome from "./Home/Bhome";
import Ahome from "./Home/Ahome";
import Detail from './Detail/Detail'
import {useState} from 'react'
import GoogleOauthhandler from "./Oauth/GoogleOauthhandler";
import KakaoOauthhandler from "./Oauth/KakaoOauthhandler"
import OauthJoin from "./Oauth/OauthJoin";
import OauthJoinhandler from "./Oauth/OauthJoinhandler";

function UserRouter(){
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);   //장바구니에 들어있는 거를 나타내는 변수

    const convertPrice = (price) => {
        return (price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }

    return(
    <Routes>
        <Route path="/" element={<Bhome products={products} setProducts={setProducts}  convertPrice={convertPrice}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/1" element={<Ahome products={products} setProducts={setProducts}  convertPrice={convertPrice} cart={cart}/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="/Basket" element={<Basket cart={cart} setCart={setCart} convertPrice={convertPrice}/>}/>
        <Route path="/Goodsup" element={<Goodsup products={products} setProducts={setProducts} cart={cart}/>}/>
        <Route path="/Uplist" element={<Uplist/>}/>
        <Route path="/Orderlist" element={<Orderlist/>}/>
        <Route path="/product/:id" element={<Detail convertPrice={convertPrice} cart={cart} setCart={setCart}/>}/>
        <Route path="/oauth/:token" element={<GoogleOauthhandler/>}/>
        <Route path="/oauth/:token" element={<KakaoOauthhandler/>}/>
        <Route path="/registration/:token" element={<OauthJoinhandler/>}/>
        <Route path="/registration" element={<OauthJoin/>}/>
    </Routes>
    );
}
export default UserRouter;