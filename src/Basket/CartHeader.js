import  {Checkbox}  from '@material-ui/core';
import { amber, pink } from '@material-ui/core/colors';
import { useEffect, useState } from 'react';
import { cartGet } from '../Api/ApiService';
import './Basket.css';

function CartHeader({cart, checkedLists, setCheckedLists, handleAllCheck, isAllChecked}){

  // const ChangeElement = (checked) => {
  //   if(checked){
  //     setCheckedState("On")
  //     cartGet().then((res) => {
  //       setCheckedList(res.data.data)
  //     })
  //   }else{
  //     setCheckedState("Off")
  //     setCheckedList([])
  //   }
  // }
  // const handleAllCheck = (event) => {
  //   if(event.target.checked){
  //     setCheckedLists(cart)
  //   }else{
  //     setCheckedLists([])
  //   }
  // };

  // useEffect(() => {
  //   cartGet().then((res) => 
  //     setCheckedLists(res.data.data)
  //   )
  //   console.log("헤더에서 장바구니 목록추가")
  // },[])

  return(
      <div className="cart_title_wrap">
        <div className="tab_title">
          {/* <input type="checkbox" onChange={(e) => handleAllCheck(e.target.checked)}
          checked={checkedList.length === cart.length && checkedList.length !== 0 ? true : false}/> */}
          <Checkbox
            checked={isAllChecked}
            onChange={(e) => handleAllCheck(e.target.checked)}
          />
          <span>상품정보</span>
          <span>수량</span>
          <span>상품금액</span>
          {/* <p>전체선택</p> */}
        </div>
    </div>
  );
}

export default CartHeader;