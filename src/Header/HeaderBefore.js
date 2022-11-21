import './HeaderBefore.css'
import {Link} from 'react-router-dom'
import {useState } from 'react'
import { TextField, InputAdornment, Button } from '@material-ui/core';

function Hbefore(){
  const [param, setParam] = useState();
  
  const handleChange = (event) => {
    setParam(event.target.value);
    
  };

  
    return(
        <div className="Menu">
        <div className="Logo">
          <a href="/">SHOP</a>
        </div>
        <div className='SearchBar'>
          <form className='search_form'>
            {" "}
            {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}

         
            <TextField id= "searchparam" placeholder='검색' name="searchparam" fullWidth variant='outlined' autoComplete='none' onChange={handleChange}  InputProps={{
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
        <div className="UserInfBefore">
          <ul id="List">
            <li><h3><Link to="../Login">로그인</Link></h3></li>
            <li><h3><Link to="../Join">회원가입</Link></h3></li>
          </ul>
        </div>
      </div>
    );
}
export default Hbefore