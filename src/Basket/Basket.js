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
const address = window.location.pathname
const [cartlength, setCartLength] = useState(0)
// const [price, setPrice] = useState(0)
const [s,setS] = useState("a")
// const [c,setC] = useState([])
// const [checkedState, setCheckedState] = useState(0)
const [checkedList, setCheckedList] = useState([])
//체크리스트 데이터를 넣을 Hooks
const [money,setMoney] = useState(0)
const TokenHeaderView = (token) => {  //토큰 유무에 따른 헤더뷰어 함수
    return token ? <Hafter cart={cart}/> : <Hbefore/>
}

const ErrorFix = (item) => {
  return (checkedList.find((el) => el.cartId === item))
}

useEffect(() => {
  cartGet().then(res => {
    setCart(res.data.data)
    setCartLength(res.data.data.length)
    // setPrice(res.data.totalsum)
    // res.data.data.length >= 1 ? setCheckedState("On") : setCheckedState("Off")
    setCheckedList(res.data.data.filter((el) => ErrorFix(el.cartId)))
  })
},[s])


useEffect(() => {
  var price = 0
  checkedList.map((el) => {
    price += (el.carttotal * el.productPrice)
  })
  setMoney(price)
  console.log(money)
},[checkedList])


// useEffect(() => {
//   cartGet().then((res) =>{
//     setCheckedList(checkedList.filter((bl) => {
//       res.data.data.map((al) =>
//         bl.cartId === al.cartId 
//       )
//     }))
//   })
// },[s])

// useEffect(() => {
//   setPrice(0)
//   checkedList.map((checkedList) => {
//     setPrice(price + (checkedList.carttotal * checkedList.productPrice))
//     console.log(price)
//   })
// },[s])


// return cartlength === 0 ? <Hbefore/> : <Hafter/>
useEffect(() => {
  cartGet().then((res) => {
    setCheckedList(res.data.data)
  })
},[cart])

return (
    <div>
      <header className="Header">
        {TokenHeaderView(token)}
        <h1 id='basket_title'>장바구니</h1>
      </header>
      <div className='Content'>
      <CartHeader cart={cart} checkedList={checkedList} setCheckedList={setCheckedList}/>
      {cart.length === 0 ? (
        <div className="not">
            <h2>장바구니에 담긴 상품이 없습니다.</h2>
            <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
      ) : cart.map((cart)=>{
        return <CartList key={`key-${cart.productId}`} cart={cart} setCart={setCart} convertPrice={convertPrice} s={s} setS={setS} 
        checkedList={checkedList} setCheckedList={setCheckedList}/>
      })}
      {cartlength === 0 ? "" : <TotalCart cart={cart} setCart={setCart} money={money} convertPrice={convertPrice} checkedList={checkedList} setCheckedList={setCheckedList} s={s}/>}
      </div>
    </div>
  );
};
export default Basket;