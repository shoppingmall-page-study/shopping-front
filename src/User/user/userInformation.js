import { useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { userGet } from "../../Api/ApiService";
import Hafter from "../../Header/HeaderAfter";
import UserMenuBar from "../userMenuBar";
import "./userInformation.css"

function UserInformation({convertPhoneNumber, user, setUser, cart, setCart}){
    // const [user,setUser] = useState([])
    // const addressState = window.location.pathname
    const navigate = useNavigate();

    useEffect(() => {
        userGet().then((res) => {
            setUser(res.data.data)
        })
        console.log("회원정보 가져오기")
    },[])
    console.log(user)

    const MoveUserModify = () => {
        navigate('/User/Modify')
    }

    return(
        <div>
            <div className="Header">
                <Hafter cart={cart} setCart={setCart}/>
            </div>
            <div className="Content">
                <p id="userinformaion_title">회원정보</p>
                <div className="flex_content">
                    {/* <div className="menu_bar">
                        <ol>
                            <li><Link to="/user">회원정보</Link></li>
                            <li><Link to="/UserReviewList">리뷰 목록</Link></li>
                            <li><Link to="">주문 목록</Link></li>
                            <li><Link to="">등록 상품 목록</Link></li>
                        </ol>
                    </div> */}
                    <div className="menubar_flex">
                        <UserMenuBar/>
                    </div>
                    <div className="user_window">
                        <ol>
                            <h1><span id="user_bar">회원정보</span></h1>
                        </ol>
                        <div className="user_content">
                            <ol>
                                <li>이름:</li>
                                <li>주소:</li>
                                <li>닉네임:</li>
                                <li>전화번호:</li>
                            </ol>
                            <ol id="space_pd">
                                <li>{user.username}</li>
                                <li>{user.postCode + " " + user.address}</li>
                                <li>{user.nickname}</li>
                                <li>{user.phoneNumber}</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="btn_window">
                        {/* <Link to="./Modify" id='to_modify_btn'>회원정보수정</Link> */}
                        <button type="button" id='to_modify_btn' onClick={MoveUserModify}>회원정보수정</button>
                </div>
            </div>
        </div>
    );
}
export default UserInformation