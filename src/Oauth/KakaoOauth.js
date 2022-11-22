import { Link } from "@material-ui/core";
import React from "react";



const KakaoOauth = () => {
  const API_BASE_URL = 'https://hannam.shop/api/oauth2/authorization/kakao';  // 주소로 전해 받음 -> 보내고 성공 url 에서 get방식으로 토큰 받기 하면된다.
  const GOOGLE_AUTH_URL = API_BASE_URL;

  return (
    <>
    <Link href={GOOGLE_AUTH_URL}><img className = "auth_img"  src="./images/kakao.svg"></img></Link>
    </>
    
  );
};

export default KakaoOauth;