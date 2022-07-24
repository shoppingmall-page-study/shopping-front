import React,{useState} from "react";
import Hbefore from "../Header/HeaderBefore";
import {googlelogin} from "../Api/ApiService";

import {
  Link,
  Button,
  TextField,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";

const Login = () => {
  const handleSubmit = (event) => {
    window.location.href = ""
  };

  return (
    <>
    <Button onClick={handleSubmit}>google로그인</Button>
    </>
    
  );
};

export default Login;