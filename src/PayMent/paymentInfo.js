import "./Payment.css"

function PaymentInfo({payList}){
    return(
        <div  className="paymentInfo_window">
            <div className="paymentInfo_img">
                <img id="paymentInfo_img"src={payList.imgUrl} alt="product_img"/>
            </div>
            <div className="payment_info">
                <div className="paymentInfo_title">
                    <p>{payList.productName}</p>
                </div>
                <div className="paymentInfo_content">
                    <p>가격 : {payList.productPrice}원</p>
                    <p id="paymentInfo_count">수량 : {payList.carttotal}</p>
                </div>
            </div>
        </div>
    );
}
export default PaymentInfo;