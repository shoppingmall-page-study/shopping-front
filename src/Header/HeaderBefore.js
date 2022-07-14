import './HeaderBefore.css'
import {Link} from 'react-router-dom'

function Hbefore(){
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
            <li><h3><Link to="../Login">로그인</Link></h3></li>
            <li><h3><Link to="../Join">회원가입</Link></h3></li>
          </ul>
        </div>
      </div>
    );
}
export default Hbefore