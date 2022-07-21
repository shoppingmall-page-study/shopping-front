import './Basket.css'
import CartHeader from './CartHeader';
import CartList from './CartList';
import TotalCart from './TotalCart';

function Basket({cart, setCart, convertPrice}){
  return (
    <>
      <header className="header">
        <h1>장바구니</h1>
      </header>
      <CartHeader/>
      {cart.length == 0 ? (
        <div className="not">
            <h2>장바구니에 담긴 상품이 없습니다.</h2>
            <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
      ) : cart.map((cart)=>{
        return <CartList key={`key-${cart.id}`} cart={cart} setCart={setCart} convertPrice={convertPrice}/>
      })}
      {cart.length === 0 ? "" : <TotalCart/>}      
    </>
  );
};
export default Basket;