import { Link } from "react-router-dom";
import Hafter from "../Header/HeaderAfter";

function UserModify(){
    return(
        <div>
            <div className="Header">
                <Hafter/>
                <h1>회원정보</h1>
            </div>
            <div className="Content">
                <div className="user_window">
                    <h1>회원 정보</h1>
                    <div className="user_view">
                    <ol id="left">
                        <li>이름</li>
                        <li>배송 주소</li>
                        <li>닉네임</li>
                        <li>전화번호</li>
                    </ol>
                    
                    </div>
                    <Link to="../User">완료</Link>
                </div>                
            </div>
        </div>
    );
}
export default UserModify