import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userGet } from "../Api/ApiService";
import Hafter from "../Header/HeaderAfter";
import "./userInformation.css"

function UserInformation({convertPhoneNumber}){
    const [user,setUser] = useState([])
    // const {id} = useParams()
    useEffect(() => {
        userGet().then((res) => {
            setUser(res.data)
        })
    },[])
    return(
        <div>
            <div className="Header">
                <Hafter/>
                <h1 id="user_title">회원정보</h1>
            </div>
            <div className="Content">
                <div className="flex_content">
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
                            <h1><span id="user_bar">회원정보</span></h1>
                        </ol>
                        <div className="user_content">
                            <ol>
                                <li>이름:</li>
                                <li>배송주소:</li>
                                <li>닉네임:</li>
                                <li>전화번호:</li>
                            </ol>
                            <ol>
                                <li>{user.username}</li>
                                <li>{user.address}</li>
                                <li>{user.nickname}</li>
                                <li>{convertPhoneNumber(user.phoneNumber)}</li>
                            </ol>
                        </div>
                    </div>
                    <div className="btn_window">
                        <Link to="./Modify" id='to_modify_btn'>회원정보수정</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserInformation