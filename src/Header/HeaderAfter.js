import './HeaderAfter.css'
import {Link, useParams} from 'react-router-dom'
import AHome from '../Home/Ahome';
import {cartGet, signout, userGet,searchPost} from '../Api/ApiService'
import React, {useEffect, useState } from 'react'
import { TextField, InputAdornment, Button } from '@material-ui/core';


function Hafter({cart, setCart, a, setA, s}){
  const {id} = useParams()
  const address = window.location.pathname
  const [userState,setUserState] = useState("down");
  const [user,setUser] = useState([])
  const [param, setParam] = useState();
  const [count,setCount] = useState(0);

  const handleChange = (event) => {
    setParam(event.target.value);
  };
  //  response 데이터 

  useEffect(() => {
    userGet().then((res) => {
      setUser(res.data)
   })
  },[])

  useEffect(() => {
    cartGet().then((res) => {
      setCount(res.data.data.length)
    })
    console.log("aaaa")
  })

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
      <div className="Logo">
        <h1><a href="/">Shop</a></h1>
      </div>
      <div className='SearchBar'>
      <form>
        {" "}
        {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
        
         
        <TextField id= "searchparam" label="검색" name="searchparam" fullWidth variant='outlined' autoComplete='none' onChange={handleChange}  InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Link to={`/product/search/${param}`}>
                <Button type='sumbit' fullWidth variant='outlined' color='default'>검색</Button>
            </Link>
            
          </InputAdornment>
        ),
      }}/>
          
          
      </form>
      </div>
      <div className="UserInf">
        <ul id="List">
          <ul id="SemiList">
              <li><h3><Link to="../Basket">장바구니</Link></h3></li>
              {
              count >= 1 ? (
                  <span id='new_shopping_cart'><p>{count}</p></span>
              ) : ("")}
              <li><h3><Link to="../Goodsup">상품등록</Link></h3></li>
              <li><h3 className='user'><Link to="" onClick={HandleUserState}>{user.username}<span id='name'>님</span></Link></h3></li>
              {
              userState === "up" ? (
              <div className='userBox'>
                <p><Link to="../user">회원정보</Link></p>
                <div id='textline'></div>
                <p><Link to="../UserReviewList">리뷰 목록</Link></p>
                <div id='textline'></div>
                <p><Link to="../order">주문 목록</Link></p>
                <div id='textline'></div>
                <p><Link to="../UserProducList">등록 상품 목록</Link></p>
              </div>)
              : ""
              }
              <li><button id="logoutbtn" onClick={signout}>로그아웃</button></li>
          </ul>
        </ul>
      </div>
    </div>
  );
}
export default Hafter