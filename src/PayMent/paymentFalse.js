import Hafter from "../Header/HeaderAfter";
import "./Payment.css"
function PaymentFalse({error_msg}){
    const goHome = () => {
        window.location.href="/"  //쇼필계속하기 클릭스
    }
    const goBasket =() => {
        window.location.href="/Basket"
    }

    return(
        <div>
            <div className="Header">
                <Hafter/>
            </div>
            <div className="Content">
                <div className="False_payment">
                    <p id="False_payment_text">결제에 실패했습니다.</p>
                    <p>{error_msg}</p>
                    <button id='False_payment_btn0' onClick={goHome}>홈페이지로 돌아가기</button>
                    <button id='False_payment_btn1' onClick={goBasket}>결제 다시하기</button>
                </div>
            </div>
        </div>
    );
}
export default PaymentFalse;