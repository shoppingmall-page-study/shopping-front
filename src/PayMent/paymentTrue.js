import { useNavigate } from "react-router-dom";
import Hafter from "../Header/HeaderAfter";
import "./Payment.css"
function PaymentTrue({cart}){
    const navigate = useNavigate()
    const goHome = () => {
        navigate("/")  //쇼필계속하기 클릭스
      }
    return(
        <div>
            <div className="Header">
                <Hafter cart={cart}/>
            </div>
            <div className="Content">
                <div className="True_payment">
                    <p id="True_payment_text">결제가 성공적으로 완료되었습니다.</p>
                    <button id='True_payment_btn' onClick={goHome}>홈페이지로 돌아가기</button>
                </div>
            </div>
        </div>
    );
}
export default PaymentTrue;