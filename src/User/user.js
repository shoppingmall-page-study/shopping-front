import Hafter from "../Header/HeaderAfter";
import {Link} from 'react-router-dom'
import UserInformation from "./userInformation";
import "./user.css"

function User(){
    return(
        <div>
            <div className="Header">
                <Hafter/>
                <h1>회원 수정</h1>
            </div>
            <div className="Content">
                <div className="content_view">
                    <div className="user_menu_bar">
                        <ol>
                            <li><h3><Link to="">회원 정보</Link></h3></li>
                            <li><h3><Link to="">리뷰 목록</Link></h3></li>
                            <li><h3><Link to="">주문 목록</Link></h3></li>
                            <li><h3><Link to="">등록 상품 목록</Link></h3></li>
                        </ol>
                    </div>
                    <div className="user_view">
                        <UserInformation/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default User;
