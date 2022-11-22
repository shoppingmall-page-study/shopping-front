import './HeaderAfter.css'
import {Link, useParams} from 'react-router-dom'
// import AHome from '../Home/Ahome';
import {userGet,signout} from '../Api/ApiService'
import React, {useEffect, useState } from 'react'
import { TextField, InputAdornment, Button } from '@material-ui/core';
// import { cartGet } from "../Api/ApiService";


function Hafter({cart, a, setA, s}){
  // const {id} = useParams()
  // const address = window.location.pathname
  const [userState,setUserState] = useState("down");
  const [user,setUser] = useState([])
  const [param, setParam] = useState();
  // const [count,setCount] = useState(0);
  console.log(cart)

  const handleChange = (event) => {
    setParam(event.target.value);
  };
  //  response 데이터 

  useEffect(() => {
    userGet().then((res) => {
      // if(res.status === 404){
      //   window.localStorage.clear();
      // }
      setUser(res.data.data)
   })
   console.log("헤더에 사용자 닉네임 가져오기")
  },[])

  // useEffect(() => {
  //   cartGet().then((res) => {
  //     setCount(res.data.data.length)
  //   })
  //   // console.log("aaaa")
  // })

// 
  const HandleUserState = () => {
    if(userState === "down"){
      setUserState("up")
    }else{
      setUserState("down")
    }
    // console.log(user)
  }
  return(
    <div className="Menu">
      <div className='Logo'>
        <Link to="/">SHOP</Link>
      </div>
      <div className='SearchBar'>
      <form className='search_form'>
        {" "}
        {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
        <TextField id= "searchparam" placeholder="검색" name="searchparam" fullWidth variant='outlined' autoComplete='none' onChange={handleChange}  InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Link id="S_btn" to={`/product/search/${param}`}>
                <Button id="S_btn1" type='sumbit' fullWidth variant='outlined' color='default'>검색</Button>
            </Link>
          </InputAdornment>
        ),
      }}/>
          
          
      </form>
      </div>
      <div className="afterUserInf">
        <ul id="List">
          {/* <ul id="SemiList1"> */}
              <li id = 'cartText'><p><Link to="../Basket">장바구니</Link></p></li>
              {
              cart.length >= 1 ? (
                // <div>
                //   <p>{cart.length}</p>
                // </div>
                <span id='new_shopping_cart'><p>{cart.length}</p></span>
              ) : ("")}
              <li><p><Link to="../Goodsup">상품등록</Link></p></li>
              <li><p className='user'><Link to="" onClick={HandleUserState}>{user.nickname}<span id='name'>님</span></Link></p></li>
              {
              userState === "up" ? (
              <div className='AfteruserBox'>
                <p><Link to="../user">회원정보</Link></p>
                <div id='textline'></div>
                <p><Link to="../UserReviewList">리뷰목록</Link></p>
                <div id='textline'></div>
                <p><Link to="../order">주문목록</Link></p>
                <div id='textline'></div>
                <p><Link to="../UserProducList">등록상품목록</Link></p>
              </div>)
              : ""
              }
              <li><button id="logoutbtn" onClick={signout}>로그아웃</button></li>
          {/* </ul> */}
        </ul>
      </div>
    </div>
  );
}
export default Hafter