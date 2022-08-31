import { API_BASE_URL } from "./app-config";
import {cookie} from "react-cookie";
import axios from 'axios';
const ACCESS_TOKEN = "ACCESS_TOKEN";


export const call = (api, method, request) => {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken != "") {
    headers.append("Authorization", accessToken);
    axios.defaults.headers.common['Authorization'] = "Bearer  " + accessToken;
  }

  let options = {
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    // GET method
    options.data = request;
  }
  return axios(options.url, options)
    .then((response) =>
     {
      console.log(response)
      if(response.status === 200){
        console.log("true")
        return response
      }
      }).catch((error)=>{

        console.log(error.response)
        console.log(error.response.status)
        let errorresponse = error.response.status;
        if(errorresponse === 406){
          console.log(1)
          alert("이미 계정이 존재합니다")
          
        }
        else if(errorresponse === 403){
          window.location.href = "/login"

        }
        else if(errorresponse === 401){
          console.log(1)
          alert("비밀번호가 틀렸습니다.")
        }else if(errorresponse === 500){
          console.log(1)
          alert("계정이 존재하지 않습니다.")
        }

      })
  
}

export const signin = (userDTO) => {
  return call("/login", 'POST', userDTO).then((response) => {
    let jwt = response.headers.authorization;
    if(jwt !== null){
      localStorage.setItem(ACCESS_TOKEN, jwt);
      window.location.href = "/";
    }
    
  });
}

export const signout = () => {
  localStorage.setItem(ACCESS_TOKEN,"");
  window.location.href = "/login";
}


export const signup = (userDTO) => {
  return call("/join", "POST", userDTO);
}

export const registration = (userDTO) => {
  return call("/Oauth/join", "POST", userDTO);
}
 
export const productCreate = (goodsDTO) => {
  return call("/product/create", "POST", goodsDTO).then((response)=>{
    if(response.status == 200){
      window.location.href = "/"
    }
  })
}

export const productGet = () => {
  return call("/products","GET","")
}

export const cartCreate = (cartDTO) => {
  return call(`/cart/create/${cartDTO.productId}`,"POST",cartDTO)
}

export const cartGet = () => {
  return call("/cart/list", "GET", "")
}

export const reviewCreate = (reviewDTO) => {
  return call(`/review/create/${reviewDTO.productId}`,"POST",reviewDTO).then((response) => {
    if(response.status == 200){
      alert("성공적으로 리뷰가 등록되었습니다.")
      window.location.reload()
    }
  })
}

export const reviewGet = (id) => {
  return call(`/review/list/product/${id}`,"GET","")
}

export const cartDelete = (id) => {
  return call(`/cart/delete/${id}`,"DELETE","")
}

export const userGet = () => {
  return call("/user/info", "GET", "")
}

// export const cartUpdate = (cartDTO) => {
//   return call(`/cart/update/${cartDTO.cartId}`,"PUT",{carttotal: cartDTO.carttotal})
// }

export const userUpdate = (userDTO) => {
  return call("/user/update","PUT",userDTO).then((response) => {
    if(response.status == 200){
      alert("회원정보가 정상적으로 변경되었습니다.")
      window.location.href = "/user"
    }
  })
}

export const userReviewGet = () => {
  return call("/review/list/user","GET","")
}

export const reviewDelete = (id) => {
  return call(`/review/delete/${id}`,"DELETE","").then((response) => {
    if(response.status == 200){
      alert("성공적으로 삭제되었습니다.")
      window.location.reload()
    }
  })
}

export const userGoodsupGet = () => {
  return call("/product/list/user","GET","")
}

export const searchPost = (searchDTO) =>{
  return call("/product/search", "POST", searchDTO)}

