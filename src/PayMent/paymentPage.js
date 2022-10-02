import { useEffect, useState } from "react";
import { userGet } from "../Api/ApiService";
import Hafter from "../Header/HeaderAfter";
import { payMent } from "../Api/ApiService";
import { payMentComplete } from "../Api/ApiService";
import PaymentInfo from "./paymentInfo"
// import PaymentTrue from "./paymentTrue"
// import PaymentFalse from "./paymentFalse";
import "./Payment.css"

function PaymentPage({cart, convertPhoneNumber, payList, setPayList}){
    const [payUser, setPayUser] = useState([])
    
    useEffect(() => {
        userGet().then((res) =>{
            setPayUser(res.data)
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
    const payment = () => { //구매하기 클릭 시 
    // var proId
    // var proNum
    // payList.map((el) => {
    //     proId = el.productId
    //     proNum = el.carttotal
    //   })
    var proId;
    var proNum;
    payList.map((res)=> {
        proId = res.productId
        proNum = res.carttotal
    })
    payMent({productId: proId, productNumber: proNum}).then((res) => {
        console.log(res.data)
        const { IMP } = window;
        IMP.init('imp54601326');

        const data = {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: `${res.data.merchantUid}`,
        name: res.data.name,
        amount: res.data.amount,
        buyer_email: res.data.buyerEmail,
        buyer_name: res.data.buyerName,
        buyer_tel: res.data.buyerTel,
        buyer_addr: res.data.buyerAddr,
        buyer_postcode: res.data.buyerPostcode
        };
        console.log(data)
        IMP.request_pay(data, callback);
    })
    }
    const callback = (response) => {
    const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
    console.log(paid_amount)
    if(success){
        payMentComplete({impUid: imp_uid, productId: parseInt(merchant_uid)}).then((res) => {
            // status ? alert("결제 성공") : alert(`결제 오류: ${error_msg}`)
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
                                return <PaymentInfo key={`key-${payList.productId}`} payList={payList}/>
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