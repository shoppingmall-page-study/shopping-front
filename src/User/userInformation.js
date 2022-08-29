import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userGet } from "../Api/ApiService";
import Hafter from "../Header/HeaderAfter";
import "./userInformation.css"

function UserInformation(){
    const [user,setUser] = useState([])
    const {id} = useParams()
    useEffect(() => {
        userGet().then((res) => {
            setUser(res.data)
        })
    },[id])
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
                    <ol id="left">
                        <li>{user.username}</li>
                        <li>{user.address}</li>
                        <li>{user.nickname}</li>
                        <li>{user.phoneNumber}</li>
                    </ol>
                    </div>
                    <Link to="./Modify" id="user_modift_btn">회원 정보 수정</Link>
                </div>                
            </div>
        </div>
    );
}
export default UserInformation