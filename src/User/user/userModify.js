// import { Link } from "react-router-dom";
import Hafter from "../../Header/HeaderAfter";
import { TextField } from '@material-ui/core';
import "./userModify.css"
import { userUpdate } from "../../Api/ApiService";
import UserMenuBar from "../userMenuBar";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function UserModify({user, setUser, cart}){
    
    useEffect(() => {
        const a = document.createElement("script");
        a.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.head.appendChild(a);
        return () => {
          document.head.removeChild(a);
        }      
      },[]) //우편번호 스크립트 주소추가 및 삭제
    
      const addrView = useRef([]);
    
      const foldDaumPostcode = () => {
        addrView.current[0].style.display = 'none';
      }
    
      const HandleOnclick = () => {
        const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        new window.daum.Postcode({
          onComplete: (data) => {
            let fullAddress = data.address;
            let extraAddress = '';
    
            if (data.addressType === 'R') {
              if (data.bname !== '') {
                 extraAddress += data.bname;
               }
              if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
              }
              fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
            }
            // addrView.current[1].value = data.zonecode
            addrView.current[2].value = fullAddress
    
            addrView.current[3].focus()
            addrView.current[0].style.display = 'none';
            document.body.scrollTop = currentScroll;
          },
          onresize: (size) => {
            addrView.current[0].style.height = size.height+'px';
          },
          width: '100%',
          height: '100%'
        }).embed(addrView.current[0])
        addrView.current[0].style.display = 'block';
      }
      
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
                        {/* <h1><span id="user_bar_modify">회원정보수정</span></h1> */}
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
                                        fullWidth
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
                                        fullWidth
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
                                        fullWidth
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
                                        fullWidth
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
                                        {/* <TextField
                                        variant="outlined"
                                        required
                                        size="small"
                                        placeholder="우편번호"
                                        id="num"
                                        inputRef={el => (addrView.current[1] = el)}
                                        /> */}
                                        <button type='button' onClick={HandleOnclick} id="Addr_btn0">우편번호 찾기</button>
                                        <tr></tr>
                                        <TextField name="postCode"
                                        required
                                        // label="제목" 
                                        // className="goodsModify_title"
                                        inputRef={el => (addrView.current[2] = el)}
                                        variant="outlined"
                                        fullWidth
                                        id="user_modify_postCode"
                                        defaultValue={user.postCode}
                                        />
                                        <tr></tr>
                                        <TextField name="address"
                                        required
                                        // label="제목" 
                                        // className="goodsModify_title"
                                        variant="outlined"
                                        fullWidth
                                        defaultValue={user.address}
                                        inputRef={el => (addrView.current[3] = el)}
                                        />
                                        {/* </div> */}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div ref={el => (addrView.current[0] = el)} className='style'>
                           <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" onClick={foldDaumPostcode} alt="취소"/>
                        </div>
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