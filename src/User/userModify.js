import { Link } from "react-router-dom";
import Hafter from "../Header/HeaderAfter";
import { TextField } from '@material-ui/core';
import "./userModify.css"
import { userUpdate } from "../Api/ApiService";

function UserModify(){

    const HandleUserUpdate = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const username = data.get('username')
        const address = data.get('address')
        const nickname = data.get('nickname')
        const phoneNumber = data.get('phoneNumber')
        userUpdate({username: username, address: address, nickname: nickname, phoneNumber: phoneNumber})
    }
    return(
        <div>
            <div className="Header">
                <Hafter/>
                <h1 id="user_title">회원정보수정</h1>
            </div>
            <div className="Content">
                <form className="flex_content" onSubmit={HandleUserUpdate}>
                    <div className="menu_bar">
                        <ol>
                            <li><Link to="/user">회원정보</Link></li>
                            <li><Link to="">리뷰 목록</Link></li>
                            <li><Link to="">주문 목록</Link></li>
                            <li><Link to="">등록 상품 목록</Link></li>
                        </ol>
                    </div>
                    <div className="user_window">
                        <ol>
                            <h1><span id="user_bar">회원정보수정</span></h1>
                        </ol>
                        <div className="user_content">
                            <ol>
                                <li>이름:</li>
                                <li>배송주소:</li>
                                <li>닉네임:</li>
                                <li>전화번호:</li>
                            </ol>
                            <ol id="no_margin">
                                <li>
                                <TextField name="username"
                                label="이름" 
                                variant="standard"/>
                                </li>
                                <li>
                                <TextField name="address"
                                fullWidth
                                label="배송주소" 
                                className="username_form"
                                variant="standard"/>
                                </li>
                                <li>
                                <TextField name="nickname"
                                label="닉네임" 
                                variant="standard"/>
                                </li>
                                <li>
                                <TextField name="phoneNumber"
                                label="전화번호" 
                                variant="standard"/>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="btn_window">
                        {/* <Link to="./Modify" id='to_modify_btn'>회원정보수정</Link> */}
                        <button type="submit" id='to_modify_btn'>회원정보수정</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default UserModify