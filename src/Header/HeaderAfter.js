import './HeaderAfter.css'
import {Link} from 'react-router-dom'
import AHome from '../Home/Ahome';
import {cartGet, signout} from '../Api/ApiService'
import {useState } from 'react'

function Hafter({cart}){
  const [userState,setUserState] = useState("down")

  const HandleUserState = () => {
    if(userState === "down"){
      setUserState("up")
    }else{
      setUserState("down")
    }
  }

  return(
    <div className="Menu">
      <div className="Logo">
        <h1><a href="/">Shop</a></h1>
      </div>
      <div className='SearchBar'>
          <form className='SearchForm'>
              <input id="Search" type="text" placeholder="검색" autoFocus></input>
          </form>
      </div>
      <div className="UserInf">
        <ul id="List">
          <ul id="SemiList">
              <li><h3><Link to="../Basket">장바구니</Link></h3></li>
              {/* {cart.length >= 1 ? (
                <div className="new_shopping_cart">
                  <p>{cart}</p>
                </div>
              ) : ("")} */}
              <li><h3><Link to="../Goodsup">상품등록</Link></h3></li>
              <li><h3 className='user'><Link to="" onClick={HandleUserState}>000님</Link></h3></li>
              {
              userState === "up" ? (
              <div className='userBox'>
                <p><Link to="../user">회원정보</Link></p>
                <div id='textline'></div>
                <p><Link to="">리뷰 목록</Link></p>
                <div id='textline'></div>
                <p><Link to="">주문 목록</Link></p>
                <div id='textline'></div>
                <p><Link to="">등록 상품 목록</Link></p>
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