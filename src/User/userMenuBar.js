import {Link} from 'react-router-dom';
import "./UserMenuBar.css"

function UserMenuBar(){
    return(
        <div className="menu_bar">
            <ol>
                <li><Link to="/user">회원정보</Link></li>
                <li><Link to="/UserReviewList">리뷰 목록</Link></li>
                <li><Link to="">주문 목록</Link></li>
                <li><Link to="/UserProducList">등록 상품 목록</Link></li>
            </ol>
        </div>
    );
}
export default UserMenuBar;