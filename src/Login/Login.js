// import React,{useState} from "react";
import Hbefore from "../Header/HeaderBefore";
import {signin} from "../Api/ApiService";
import GoogleOauth from "../Oauth/GoogleOauth";
import "./Login.css"

import {
  Link,
  Button,
  TextField,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import KakaoOauth from "../Oauth/KakaoOauth";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");
    // ApiService의 signin 메서드를 사용 해 로그인.
    signin({ email: email, password: password });
  };

  return (
    <>
    <header className="Header">
            <Hbefore/>
        </header>
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        
      <Grid container spacing={2} className="Content">
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
        </Grid>
      </Grid>
      <form  onSubmit={handleSubmit}>
        {" "}
        {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="패스워드"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button id="login_btn" type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
          <Link href="/join" variant="body2">
            <Grid item id="not_id">계정이 없습니까? 여기서 가입 하세요.</Grid>
          </Link>
          <Grid item xs={12}>
            <p id = "oauth_login_text">간편 로그인</p>
            <GoogleOauth/>
            <KakaoOauth/>
          </Grid>
        </Grid>
      </form>
    </Container>
    </>
    
  );
};

export default Login;
