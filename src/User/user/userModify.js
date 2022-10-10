// import { Link } from "react-router-dom";
import Hafter from "../../Header/HeaderAfter";
import { TextField } from '@material-ui/core';
import "./userModify.css"
import { userUpdate } from "../../Api/ApiService";
import UserMenuBar from "../userMenuBar";
import { Link } from "react-router-dom";

function UserModify({user, setUser, cart}){
    const HandleUserUpdate = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const username = data.get('username')
        const address = data.get('address')
        const nickname = data.get('nickname')
        const phoneNumber = data.get('phoneNumber')
        const postCode = data.get('postCode')
        const age = data.get('age')
        userUpdate({username: username, address: address, age: age, nickname: nickname, phoneNumber: phoneNumber, postCode: postCode})
    }

    const HandlePhoneNumber = (e) => {
        e.target.value = e.target.value.substr(0,13)
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    }

    return(
        <div>
            <div className="Header">
                <Hafter cart={cart}/>
                <p id="user_title">회원정보수정</p>
            </div>
            <div className="Content">
                <form className="flex_content_userModify" onSubmit={HandleUserUpdate}>
                    {/* <div className="menu_bar">
                        <ol>
                            <li><Link to="/user">회원정보</Link></li>
                            <li><Link to="">리뷰 목록</Link></li>
                            <li><Link to="">주문 목록</Link></li>
                            <li><Link to="">등록 상품 목록</Link></li>
                        </ol>
                    </div> */}
                    {/* <UserMenuBar/> */}
                    <div className="user_window_modify">
                        <h1><span id="user_bar_modify">회원정보수정</span></h1>
                        <table className="user_content_modify">
                            <tbody>
                                <tr>
                                    <th>이름</th>
                                    <td>
                                        {/* <div className="td_flex">
                                            <p>{user.username}</p>
                                            <button>이름 변경</button>
                                        </div> */}
                                        <TextField name="username"
                                        required
                                        // label="제목" 
                                        // className="goodsModify_title"
                                        variant="outlined"
                                        defaultValue={user.username}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>닉네임</th>
                                    <td>
                                        {/* <div className="td_flex">
                                            <p>{user.nickname}</p>
                                            <button>닉네임 변경</button>
                                        </div> */}
                                        <TextField name="nickname"
                                        required
                                        // label="제목" 
                                        // className="goodsModify_title"
                                        variant="outlined"
                                        defaultValue={user.nickname}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>전화번호</th>
                                    <td>
                                        {/* <div className="td_flex">
                                            <p>{user.phoneNumber}</p>
                                            <button>전화번호 변경</button>
                                        </div>     */}
                                        <TextField name="phoneNumber"
                                        required
                                        // label="제목" 
                                        // className="goodsModify_title"
                                        variant="outlined"
                                        defaultValue={user.phoneNumber}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>나이</th>
                                    <td>
                                        {/* <div className="td_flex">
                                            <p>{user.age}</p>
                                            <button>나이 변경</button>
                                        </div> */}
                                        <TextField name="age"
                                        required
                                        // label="제목" 
                                        // className="goodsModify_title"
                                        variant="outlined"
                                        defaultValue={user.age}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>주소</th>
                                    <td>
                                        {/* <div className="td_flex">
                                            <p>{user.postCode+" "+user.address}</p>
                                            <button>주소 변경</button>
                                        </div> */}
                                        {/* <div> */}
                                        <TextField name="postCode"
                                        required
                                        // label="제목" 
                                        // className="goodsModify_title"
                                        variant="outlined"
                                        id="user_modify_postCode"
                                        defaultValue={user.postCode}
                                        />
                                        <tr></tr>
                                        <TextField name="address"
                                        required
                                        // label="제목" 
                                        // className="goodsModify_title"
                                        variant="outlined"
                                        defaultValue={user.address}
                                        />
                                        {/* </div> */}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="user_modify_btn_window">
                    <Link to="/user" id="user_rmodify_return_btn">돌아가기</Link>
                    <button type="submit" id="user_modify_btn">회원정보수정</button>
                    </div>
                    {/* <div className="btn_window"> */}
                    {/* </div> */}
                </form>
            </div>
        </div>
    );
}
export default UserModify