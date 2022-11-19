import { useEffect, useState } from "react";
import { userGet } from "../Api/ApiService";
import Hafter from "../Header/HeaderAfter";
import { payMent } from "../Api/ApiService";
import { payMentComplete } from "../Api/ApiService";
import PaymentInfo from "./paymentInfo"
import PaymentTrue from "./paymentTrue"
import PaymentFalse from "./paymentFalse";
import "./Payment.css"

function PaymentPage({cart, convertPhoneNumber, payList, setPayList,checkedLists}){
    const [payUser, setPayUser] = useState([])
    const proId = payList.map((el) => el.product.productId)
    const proNum = payList.map((el) => el.productNum)
    console.log(proId, proNum)
    useEffect(() => {
        userGet().then((res) =>{
            setPayUser(res.data.data)
        })
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
          document.head.removeChild(jquery);
          document.head.removeChild(iamport);
        }      
    },[]) //아임포트 라이브러리 설치
    //걀제 개수 한개 가정
    console.log(payList)
    const payment = () => { //구매하기 클릭 시 
    // var proId
    // var proNum
    // payList.map((el) => {
    //     proId = el.productId
    //     proNum = el.carttotal
    //   })
    console.log(proId, proNum)
    // -> 리스트 형식으로
    payMent({productsId: proId, productsNumber: proNum}).then((res) => {
        // console.log(res.data.data.orderId)
        const { IMP } = window;
        IMP.init('imp54601326');

        const data = {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: res.data.data.orderId,
        name: "a",
        amount: res.data.data.amount,
        buyer_email: "b",
        buyer_name: "c",
        buyer_tel: "d",
        buyer_addr: "e",
        buyer_postcode: "f"
        };
        console.log(data)
        IMP.request_pay(data, callback);
    })
    }
    const callback = (response) => {
    const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
    console.log(response)
    if(success){
        payMentComplete({impUid: imp_uid, orderId: merchant_uid}).then((res) => {
            console.log(res)
            res.status == 200 ? window.location.href="/payTrue" : alert(`결제 실패: ${error_msg}`);
        })
    }else{
        alert(`결제 실패: ${error_msg}`);
    }}
    return(
        <div>
            <div className="Header">
                <Hafter cart={cart}/>
                <h1 id="review_title">결제페이지</h1>
            </div>
            <div className="Content">
                <div className="payment_page_content">
                    <h1><span id="pay_user">구매자 정보</span></h1>
                    <div className="pay_user_info">
                        <ol id="pay_user_info_ol0">
                            <li>이름</li>
                            <li>배송주소</li>
                            <li>전화번호</li>
                        </ol>
                        <ol>
                            <li>{payUser.username}</li>
                            <li>{payUser.address}</li>
                            <li>{payUser.phoneNumber}</li>
                        </ol>
                    </div>
                    <div className="pay_info_window">
                        <h1><span id="pay_info_logo">결제 정보</span></h1>
                        <div className="pay_info">
                            {payList.map((payList) => {
                                return <PaymentInfo key={`key-${payList.product.productId}`} payList={payList}/>
                            })}
                        </div>
                        <button id="payBtn" onClick={payment}>결제하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PaymentPage;