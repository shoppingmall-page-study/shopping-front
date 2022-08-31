import './Basket.css'
import CartHeader from './CartHeader';
import CartList from './CartList';
import TotalCart from './TotalCart';
import Hafter from '../Header/HeaderAfter';
import Hbefore from '../Header/HeaderBefore';
import { cartGet } from '../Api/ApiService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



function Basket({cart, setCart, convertPrice, token}){
const { id } = useParams();
const [cartlength, setCartLength] = useState(0)
const [price, setPrice] = useState(0)
const [s,setS] = useState("a")
// const [c,setC] = useState([])
const TokenHeaderView = (token) => {  //토큰 유무에 따른 헤더뷰어 함수
    return token ? <Hafter cart={cart}/> : <Hbefore/>
}

useEffect(() => {
  cartGet().then(res => {
    setCart(res.data.data)
    setCartLength(res.data.data.length)
    setPrice(res.data.totalsum)
  })
},[s])
{console.log(cart)}

// return cartlength === 0 ? <Hbefore/> : <Hafter/>

return (
    <div>
      <header className="Header">
        {TokenHeaderView(token)}
        <h1 id='basket_title'>장바구니</h1>
      </header>
      <div className='Content'>
      <CartHeader/>
      {cart.length === 0 ? (
        <div className="not">
            <h2>장바구니에 담긴 상품이 없습니다.</h2>
            <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
      ) : cart.map((cart)=>{
        return <CartList key={`key-${cart.productId}`} cart={cart} setCart={setCart} convertPrice={convertPrice} s={s} setS={setS}/>
      })}
      {cartlength === 0 ? "" : <TotalCart cart={cart} setCart={setCart} price={price} setPrice={setPrice} convertPrice={convertPrice}/>}
      </div>
    </div>
  );
};
export default Basket;