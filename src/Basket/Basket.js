import './Basket.css'
import CartHeader from './CartHeader';
import CartList from './CartList';
import TotalCart from './TotalCart';
import Hafter from '../Header/HeaderAfter';
import Hbefore from '../Header/HeaderBefore';
import { cartDelete, cartGet, cartUpdate } from '../Api/ApiService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



function Basket({cart, setCart, convertPrice, token, payList, setPayList, checkedLists, setCheckedLists, cartCount, setCartCount}){
const { id } = useParams();
const address = window.location.pathname
// const [cartlength, setCartLength] = useState(0)
// const [price, setPrice] = useState(0)
const [s,setS] = useState("a")
// const [c,setC] = useState([])
// const [checkedState, setCheckedState] = useState(0)
//체크리스트 데이터를 넣을 Hooks
// const [money,setMoney] = useState(0)
const [total, setTotal] = useState(0) //체크리스트 가격을 나타내는 Hooks
const TokenHeaderView = (token) => {  //토큰 유무에 따른 헤더뷰어 함수
    return token ? <Hafter cart={cart} setCart={setCart}/> : <Hbefore/>
}

// const ErrorFix = (item) => {
//   return (checkedList.find((el) => el.cartId === item))
// }
useEffect(() => {
  const found = cart.map((el) => el.cartId)
  setCheckedLists(found)
  console.log("처음에는 카트목록에 있는 것들이 다 checkLists에 추가")
},[cart])

const handleCountUpdate = (type, id, count) => {
  const found = cart.filter((el) => el.cartId === id)[0]
  console.log(found)
  const idx = cart.indexOf(found)
  if(type === "plus"){
    if(count === found.productTotal + 1) return;
    cartUpdate({cartId: found.cartId, productNum: count}).then((res) => {
      if(res === undefined){
        alert("상품의 구매한도를 초과했습니다.")
      }else{
      if(res.status === 200){
        setCart([...cart.slice(0, idx), res.data.data, ...cart.slice(idx+1)])
      }
    }})
  }else{
    if(count === 0) return;
    cartUpdate({cartId: found.cartId, productNum: count}).then((res) => {
      console.log(res.data.data)
      if(res.status === 200){
        setCart([...cart.slice(0, idx), res.data.data, ...cart.slice(idx+1)])
      }
    })
  }
}

//해당 상품 삭제
const HandleCartRemove = (id) => {
  cartDelete(id).then((res) =>{
    if(res.status === 200){
      setCart(cart.filter((el) => el.cartId !== id))
      setCheckedLists(checkedLists.filter((check) => check !== id))
      alert("해당 상품이 삭제되었습니다.")
    }
  })
}

const handleCheckList = (checked, id) => {
  if(checked){
    setCheckedLists([...checkedLists, id])
  }else{
    setCheckedLists(checkedLists.filter((el) => el !== id))
  }
}

const handleAllCheck = (checked) => {
  if(checked){
    const checkedItems = [];
    cart.map((cart) => checkedItems.push(cart.cartId))
    setCheckedLists(checkedItems)
  }else{
    setCheckedLists([])
  }
}

const isAllChecked = cart.length === checkedLists.length && checkedLists.length !== 0 //cartHeader에서 체크

const found = checkedLists.map((checkedList) => 
  // cart.filter((el) => el.cartId === checkedList)
  cart.filter((el) => el.cartId === checkedList)
) //cart에서 체크된 리스트 목록 반환
console.log(found)

useEffect(() => {
  const temp = found.map((el) => el[0])
  setPayList(temp)
},[checkedLists,cart])
console.log(payList)
useEffect(() => {
  // cartGet().then(res => {
  //   setCart(res.data.data)
    // setCartLength(res.data.data.length)
    // setPrice(res.data.totalsum)
    // res.data.data.length >= 1 ? setCheckedState("On") : setCheckedState("Off")
    // setCheckedList(res.data.data.filter((el) => ErrorFix(el.cartId)))
  // })
  console.log("상품삭제 및 수정")
},[])

// useEffect(() => {
//   const found = checkedLists.map((check)=>
//     cart.map((cart) => cart.cartId == check)
//   )
// },[checkedLists])

// return cartlength === 0 ? <Hbefore/> : <Hafter/>
// useEffect(() => {
//   cartGet().then((res) => {
//     setCheckedList(res.data.data)
//   })
//   console.log("장바구니 들어왔을 때 처음 전체상품 체크리스트 표현")
// },[cart]) //문제 s가 변해도 실행된다. -> ex) 체크리스트 안되있는것도 s가 변경되면 다시 체크리스트로 됌 수정해야함
return (
    <div>
      <header className="Header">
        {TokenHeaderView(token)}
      </header>
      <div className='Content'>

      <p id='basket_title'>장바구니</p>

      <CartHeader cart={cart} checkedLists={checkedLists} setCheckedLists={setCheckedLists} handleAllCheck={handleAllCheck} isAllChecked={isAllChecked}/>
      {cart.length === 0 ? (
        <div className="not">
            <h2>장바구니에 담긴 상품이 없습니다.</h2>
            <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
      ) : cart.map((cart)=>{
        return <CartList key={`key-cart${cart.product.productId}`} cart={cart} setCart={setCart} convertPrice={convertPrice} s={s} setS={setS} 
        checkedLists={checkedLists} setCheckedLists={setCheckedLists} handleCheckList={handleCheckList} handleCountUpdate={handleCountUpdate}
        HandleCartRemove={HandleCartRemove}/>
      })}
      {cart.length === 0 ? "" : <TotalCart cart={cart} setCart={setCart} convertPrice={convertPrice} checkedLists={checkedLists} 
                                setCheckedLists={setCheckedLists} s={s} total={total} setTotal={setTotal} found={found} 
                                payList={payList} setPayList={setPayList}/>}
      </div>
    </div>
  );
};
export default Basket;