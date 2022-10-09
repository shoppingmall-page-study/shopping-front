import './Basket.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TotalCart({cart, setCart, convertPrice, checkedLists, setCheckedLists, s, total, setTotal, found}){
  useEffect(() => {
    if(found){
      // const temp = found.filter((item) => item.length !== 0)
      const sum = found.map((item) =>  item[0].product.price * item[0].productNum)
      const reducer = (acc, cur) => acc + cur;
      if(sum.length === 0){
        setTotal(0)
        return
      }
      const itemTotal = sum.reduce(reducer)
      setTotal(itemTotal)
    }else{
      setTotal(0)
    }
    console.log("체크리스트 가격 정하기")
  },[cart,total,found,setTotal])
// const [pay,setPay] = useState([])

// useEffect(() => {
//   const jquery = document.createElement("script");
//   jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
//   const iamport = document.createElement("script");
//   iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
//   document.head.appendChild(jquery);
//   document.head.appendChild(iamport);
//   return () => {
//     document.head.removeChild(jquery);
//     document.head.removeChild(iamport);
//   } 아임포트 라이브러리 설치
 
// }, []); 

// 걀제 개수 한개 가정
// const payment = () => { //구매하기 클릭 시 
//   var proId
//   var proNum
//   checkedList.map((el) => {
//     proId = el.productId
//     proNum = el.carttotal
//   })
//   payMent({productId: proId, productNumber: proNum}).then((res) => {
//     const { IMP } = window;
//     IMP.init('imp54601326');
//     const data = {
//       pg: "html5_inicis",
//       pay_method: "card",
//       merchant_uid: "String",
//       name: res.data.name,
//       amount: res.data.amount,
//       buyer_email: res.data.buyerEmail,
//       buyer_name: res.data.buyerName,
//       buyer_tel: res.data.buyerTel,
//       buyer_addr: res.data.buyerAddr,
//       buyer_postcode: res.data.buyerPostcode
//     };

//     IMP.request_pay(data, callback);
//   })
// }
// const callback = (response) => {
//   const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;

//   if(success){
//     payMentComplete({impUid: pay.merchantUid, productId: pay.merchantUid,}).then((res) => {
//       console.log(res.data)
//       res.data ? alert("결제 성공") : alert(`결제 오류: ${error_msg}`)
//     })
//   }else{
//     alert(`결제 실패: ${error_msg}`);
//   }
// }

return(
    <>
      <div className="total">
      <div className="total_price">
        <p className="cart_product_total_price">총 상품금액</p>
        <p className="cart_product_price">{convertPrice(total)}</p>
      </div>
      <div className="pay_minus">
        <img src="/images/icon-minus-line.svg" alt="minus" />
      </div>
      <div className="sale">
        <p className="cart_product_sale">상품 할인</p>
        <p className="cart_product_sale_price">0원</p>
      </div>
      <div className="pay_plus">
        <img src="/images/icon-plus-line.svg" alt="plus" />
      </div>
      <div className="delivery">
        <p className="cart_product_delivery">배송비</p>
        <p className="cart_product_delivery_price">0원</p>
      </div>

      <div className="payment">
        <p className="cart_prouct_payment">결제 예정 금액</p>
        <p className="cart_prouct_payment_price">{convertPrice(total)}</p>
      </div>
    </div>
      <div className='payment_bar'>
      <Link to="/">계속쇼핑하기</Link>
      <Link to="/Payment">구매하기</Link>
    </div>
    </>
  );
}

export default TotalCart;