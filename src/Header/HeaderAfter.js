import './HeaderAfter.css'
import {Link} from 'react-router-dom'
import AHome from '../Home/Ahome';
import {signout} from '../Api/ApiService'

function Hafter({cart}){
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
                {cart.length >= 1 ? (
                  <div className="new_shopping_cart">
                    <p>{cart.length}</p>
                  </div>
                ) : ("")}
                <li><h3><Link to="../Goodsup">상품등록</Link></h3></li>
            </ul>
            <ul>
                <li><h3><Link to="../Uplist">등록목록</Link></h3></li>
                <li><h3><Link to="../Orderlist">주문목록</Link></h3></li>
                <button onClick={signout}>로그아웃</button>
            </ul>
          </ul>
        </div>
      </div>
    );
}
export default Hafter