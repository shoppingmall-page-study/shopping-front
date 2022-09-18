import { Link } from "react-router-dom";
import Hafter from "../../Header/HeaderAfter";
import { TextField } from '@material-ui/core';
import "./userModify.css"
import { userUpdate } from "../../Api/ApiService";
import UserMenuBar from "../userMenuBar";

function UserModify({user, setUser}){

    const HandleUserUpdate = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const username = data.get('username')
        const address = data.get('address')
        const nickname = data.get('nickname')
        const phoneNumber = data.get('phoneNumber')
        const postCode = data.get('postCode')
        userUpdate({username: username, address: address, nickname: nickname, phoneNumber: phoneNumber, postCode: postCode})
    }

    const HandlePhoneNumber = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    }
    return(
        <div>
            <div className="Header">
                <Hafter/>
                <h1 id="user_title">회원정보수정</h1>
            </div>
            <div className="Content">
                <form className="flex_content" onSubmit={HandleUserUpdate}>
                    {/* <div className="menu_bar">
                        <ol>
                            <li><Link to="/user">회원정보</Link></li>
                            <li><Link to="">리뷰 목록</Link></li>
                            <li><Link to="">주문 목록</Link></li>
                            <li><Link to="">등록 상품 목록</Link></li>
                        </ol>
                    </div> */}
                    <UserMenuBar/>
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
                                <li>우편번호:</li>
                            </ol>
                            <ol id="no_margin">
                                <li>
                                <TextField name="username"
                                required
                                label="이름" 
                                variant="standard"
                                defaultValue={user.username}/>
                                </li>
                                <li>
                                <TextField name="address"
                                required
                                fullWidth
                                label="배송주소" 
                                className="username_form"
                                variant="standard"
                                defaultValue={user.address}/>
                                </li>
                                <li>
                                <TextField name="nickname"
                                required
                                label="닉네임" 
                                variant="standard"
                                defaultValue={user.nickname}/>
                                </li>
                                <li>
                                <TextField name="phoneNumber"
                                required
                                label="전화번호" 
                                variant="standard"
                                maxLength={13}
                                defaultValue={user.phoneNumber}
                                onChange={HandlePhoneNumber}/>
                                </li>
                                <li>
                                <TextField name="postCode"
                                required
                                label="우편번호" 
                                variant="standard"
                                defaultValue={user.postCode}/>
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