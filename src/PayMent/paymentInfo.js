import "./Payment.css"

function PaymentInfo({payList}){
    console.log(payList)
    return(
        <div  className="paymentInfo_window">
            <div className="paymentInfo_img">
                <img id="paymentInfo_img"src={payList.product.imgUrl} alt="product_img"/>
            </div>
            <div className="payment_info">
                <div className="paymentInfo_title">
                    <p>{payList.product.name}</p>
                </div>
                <div className="paymentInfo_content">
                    <p>가격 : {payList.product.price*payList.productNum}원</p>
                    <p id="paymentInfo_count">수량 : {payList.productNum}</p>
                </div>
            </div>
        </div>
    );
}
export default PaymentInfo;