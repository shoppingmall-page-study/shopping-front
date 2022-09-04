import { useEventCallback } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { cartDelete, cartGet, cartUpdate } from '../Api/ApiService';
import './Basket.css';

function CartList({cart, setCart, convertPrice, s, setS, checkedList, setCheckedList}){
  //하야할 일
  //장바구니 체크박스0
  //장바구니 총 상품가격 Hooks 수정
 
  //장바구니 삭제
  const HandleCartRemove = () => {
    cartDelete(cart.cartId).then((response) => {
      if(response.status == 200){
        if(s == "a"){
          setS("b")
        }else{
          setS("a")
        }
      }
    })
  }
 
  //장바구니에서 -, + 버튼 클릭시 수량 값 수정
  const HandleCartUpdate = (type) => {
    if(type === "plus"){
      cartUpdate({cartId: cart.cartId, carttotal: cart.carttotal + 1}).then((res) => {
        if(res.status == 200){
          if(s == "a"){
            setS("b")
          }else{
            setS("a")
          }
        }
      })
      // setCheckedList(checkedList.filter((el) => el.cartId !== cart.cartId))
      // setCheckedList([...checkedList.cart])
    }else{
      if(cart.carttotal == 1)return;
      cartUpdate({cartId: cart.cartId, carttotal: cart.carttotal - 1}).then((res) => {
        if(res.status == 200){
          if(s == "a"){
            setS("b")
          }else{
            setS("a")
          }         
      }})
      // setCheckedList(checkedList.filter((el) => el.cartId !== cart.cartId))
      // setCheckedList([...checkedList.cart])
    }
  }

  // const CheckedElement = (checked) => {
  //   if(checked){
  //     setCheckedList([...checkedList, cart])
  //     if(checkedList.length + 1 === cartlength){
  //       setCheckedState("On")
  //     }
  //   }else{
  //     setCheckedState("Off")
  //     setCheckedList(checkedList.filter((el) => el.cartId !== cart.cartId))
  //   }
  // }
  const handleSingleCheck = (checked, item) =>{
    if(checked){
      setCheckedList([...checkedList, item])
    }
    else{
      setCheckedList(checkedList.filter((el) => el.cartId !== item.cartId))
    }
  }
  
  return(
        <section className="cart_product_list">
        <input type="checkbox" onChange={(e) => handleSingleCheck(e.target.checked, cart)}
        checked={checkedList.find((el) => el.cartId === cart.cartId) ? true : false}/>
        <div className="cart_product_wrap">
          <div className="cart_product_image">
            <img src={cart.imgUrl} alt="product-img" />
          </div>

          <div className="cart_product_info">          
            <p className="product_name">{cart.productName}</p>
            <p className="price">{convertPrice(cart.productPrice * cart.carttotal)}원</p>
            <p className="delivery">택배배송 / 무료배송</p>
          </div>
        </div>

        <div className="cart_product_count">
          <img
            className="minus"
            src="/images/icon-minus-line.svg"
            alt="minus"
            onClick={() => HandleCartUpdate("minus")}
          />

          <div className="count">
            <span>{cart.carttotal}</span>
          </div>
          <img
            className="plus"
            src="/images/icon-plus-line.svg"
            alt="plus"
            onClick={() => HandleCartUpdate("plus")}
          />
        </div>

        {/* <div className="cart_product_price">
          <p className="total_price"></p>
          <button className="btn_submit">주문하기</button>
        </div> */}

        <div className="product_remove">
          <img src="/images/icon-delete.svg" alt="delete" onClick={HandleCartRemove}/>
        </div>
      </section>
    );
}

export default CartList;