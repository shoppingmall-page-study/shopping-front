import React, { useEffect } from "react";
import { useParams } from "react-router";

function KakaoOauthhandler() {
  const params = useParams();

  useEffect(() => {
    console.log(params.token);
    localStorage.clear();
    localStorage.setItem("ACCESS_TOKEN", params.token);
    window.location.replace("/1");
  }, []);

  return <></>;
}

export default KakaoOauthhandler;