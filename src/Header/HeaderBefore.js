import './HeaderBefore.css'
import {Link} from 'react-router-dom'
import {useEffect, useState } from 'react'
import { TextField, InputAdornment, Button } from '@material-ui/core';

function Hbefore(){
  const [param, setParam] = useState();
  
  const handleChange = (event) => {
    setParam(event.target.value);
    
  };

  
    return(
        <div className="Menu">
        <div className="Logo">
          <h1><a href="/">Shop</a></h1>
        </div>
        <div className='SearchBar'>
          <form >
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
            <li><h3><Link to="../Login">로그인</Link></h3></li>
            <li><h3><Link to="../Join">회원가입</Link></h3></li>
          </ul>
        </div>
      </div>
    );
}
export default Hbefore