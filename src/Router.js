import React from "react";
import {Route,Routes, useParams} from 'react-router-dom'
import Login from "./Login/Login";
import Join from "./Join/Join";
// import Hafter from "./Header/HeaderAfter";
// import Hbefore from "./Header/HeaderBefore";
import Basket from "./Basket/Basket";
import Goodsup from "./Goodsup/Goodsup";
import Uplist from "./Uplist/Uplist";
import Orderlist from "./Orderlist/Orderlist";
import Bhome from "./Home/Bhome";
import Ahome from "./Home/Ahome";
import Detail from './Detail/Detail'
import {useState, useEffect} from 'react'
import GoogleOauthhandler from "./Oauth/GoogleOauthhandler";
import KakaoOauthhandler from "./Oauth/KakaoOauthhandler"
import OauthJoin from "./Oauth/OauthJoin";
import OauthJoinhandler from "./Oauth/OauthJoinhandler";
import UserInformation from "./User/user/userInformation"
import UserModify from "./User/user/userModify";
import ReviewList from "./User/review/reviewList";
import Searchhome from "./Home/Searchhome";
import SearchBhome from "./Home/SearchBhome"
import UserGoodsUp from "./User/UserGoodsUp/userGoodsup";
import ReviewModify from "./User/review/reviewModify";
import UserGoodsUpModify from "./User/UserGoodsUp/userGoodsUpModify";
import PaymentPage from "./PayMent/paymentPage";
import OrderList from "./User/order/orderList";
//일단 확인 용
import PaymentFalse from "./PayMent/paymentFalse";
import PaymentTrue from "./PayMent/paymentTrue";
// import User from "./features/user/User"

function UserRouter(){
    const {id} = useParams()
    const [reviewSelect, setReviewSelect] = useState([]);   //리뷰 수정을 위해 선택된 리뷰목록을 저장하는 Hooks
    // const [cart, setCart] = useState([]);   //장바구니에 들어있는 거를 나타내는 변수
    const [user,setUser] = useState([]); //회원정보를 나타내는 Hooks
    const [searchProducts, setSearchProducts]  = useState([]); // 상품 검색한 리스트 
    const [productSelect, setProductSelect] = useState([]); //등록상품 수정이 클릭된 해당 등록상품을 저장하는 Hooks
    const [cartCount, setCartCount] = useState([]) 
    const [payList, setPayList] = useState([])
    const [checkedLists, setCheckedLists] = useState([])  //체크리스트 목록
    const [cart, setCart] = useState([]);   //장바구니에 들어있는 거를 나타내는 변수
    const [products, setProducts] = useState([]);
    const convertPrice = (price) => {
      // console.log(price)
      return (price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
    
    const convertPhoneNumber = (phoneNumber) => {
        return (Object(phoneNumber).toString().replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
    }
    const token = localStorage.getItem("ACCESS_TOKEN")
    var cnt = 0
    

    return(
    <Routes>
        <Route path="/" element={token !== "" ? <Ahome cart={cart} setCart={setCart} products={products} setProducts={setProducts} convertPrice={convertPrice}/> : <Bhome products={products} setProducts={setProducts}  convertPrice={convertPrice}/>}/>
        {/* <Route path="/" element={<Ahome products={products} setProducts={setProducts} convertPrice={convertPrice}/>}/> */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="/Basket" element={<Basket cart={cart} setCart={setCart} convertPrice={convertPrice} token={token} payList={payList} setPayList={setPayList} 
                                        checkedLists={checkedLists} setCheckedLists={setCheckedLists} cartCount={cartCount} setCartCount={setCartCount}/>}/>
        <Route path="/Goodsup" element={<Goodsup products={products} setProducts={setProducts} cart={cart} setCart={setCart}/>}/>
        <Route path="/Uplist" element={<Uplist/>}/>
        {/* <Route path="/Orderlist" element={<Orderlist/>}/> */}
        <Route path="/product/:id" element={<Detail convertPrice={convertPrice} cart={cart} setCart={setCart} token={token} payList={payList} setPayList={setPayList}/>}/>
        <Route path="/oauth/:token" element={<GoogleOauthhandler/>}/>
        <Route path="/oauth/:token" element={<KakaoOauthhandler/>}/>
        <Route path="/registration/:token" element={<OauthJoinhandler/>}/>
        <Route path="/registration" element={<OauthJoin/>}/>
        <Route path="/User" element={<UserInformation convertPhoneNumber={convertPhoneNumber} user={user} setUser={setUser} cart={cart} setCart={setCart}/>}/>
        <Route path="/User/Modify" element={<UserModify user={user} setUser={setUser} cart={cart} setCart={setCart}/>}/>
        <Route path="/UserReviewList" element={<ReviewList reviewSelect={reviewSelect} setReviewSelect={setReviewSelect} cart={cart} setCart={setCart}/>}/>
        <Route path="/product/search/:name" element={token !== "" ? <Searchhome cart={cart} setCart={setCart} convertPrice={convertPrice} searchProducts={searchProducts} setSearchProducts={setSearchProducts}/>:<SearchBhome convertPrice={convertPrice} searchProducts={searchProducts} setSearchProducts={setSearchProducts}/>}/>
        <Route path="/UserProducList" element={<UserGoodsUp convertPrice={convertPrice} productSelect={productSelect} setProductSelect={setProductSelect}
                                                            cart={cart} setCart={setCart}/>}/>
        <Route path="/UserReviewList/Modify" element={<ReviewModify reviewSelect={reviewSelect} setReviewSelect={setReviewSelect} cart={cart} setCart={setCart}/>}/>
        <Route path="/UserProducList/Modify" element={<UserGoodsUpModify convertPrice={convertPrice} productSelect={productSelect} 
                                                                        setProductSelect={setProductSelect} cart={cart} setCart={setCart}/>}/>
        <Route path="/PayMent" element={<PaymentPage convertPhoneNumber={convertPhoneNumber} payList={payList} setPayList={setPayList} cart={cart} checkedLists={checkedLists}/>}/>
        <Route path="/order" element={<OrderList convertPrice={convertPrice} cart={cart} setCart={setCart}/>}/>
        {/* 확인용 */}
        <Route path="/payTrue" element={<PaymentTrue cart={cart}/>}/>
        {/* <Route path="/a" element={<User/>}/> */}
    </Routes>
    );
}
export default UserRouter;