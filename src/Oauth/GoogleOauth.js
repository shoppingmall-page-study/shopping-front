import { Link } from "@material-ui/core";
import React from "react";



const GoogleOauth = () => {
  const API_BASE_URL = 'http://localhost:8080/oauth2/authorization/google';  // 주소로 전해 받음 -> 보내고 성공 url 에서 get방식으로 토큰 받기 하면된다.
  const GOOGLE_AUTH_URL = API_BASE_URL;


  return (
    <>
    <Link href={GOOGLE_AUTH_URL} >구글 로그인</Link>
    </>
    
  );
};

export default GoogleOauth;