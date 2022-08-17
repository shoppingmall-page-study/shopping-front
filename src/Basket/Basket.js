import './Basket.css'
import CartHeader from './CartHeader';
import CartList from './CartList';
import TotalCart from './TotalCart';
import Hafter from '../Header/HeaderAfter';
import Hbefore from '../Header/HeaderBefore';
import { cartGet } from '../Api/ApiService';
import { Children } from 'react';

function Basket({cart, setCart, convertPrice, token}){

const TokenHeaderView = (token) => {  //토큰 유무에 따른 헤더뷰어 함수
    return token ? <Hafter cart={cart}/> : <Hbefore/>
}

return (
    <>
      <header className="Header">
        {TokenHeaderView(token)}
      </header>
      <div className='Content'>
      <CartHeader/>
      {cart.length == 0 ? (
        <div className="not">
            <h2>장바구니에 담긴 상품이 없습니다.</h2>
            <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
      ) : cart.map((cart)=>{
        return <CartList key={`key-${cart.productId}`} cart={cart} setCart={setCart} convertPrice={convertPrice}/>
      })}
      {cart.length === 0 ? "" : <TotalCart/>}      
      </div>
    </>
  );
};
export default Basket;