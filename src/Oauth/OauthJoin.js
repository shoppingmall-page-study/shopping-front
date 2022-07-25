import React, { useEffect } from "react";
import { useParams } from "react-router";
import { registration } from "../Api/ApiService";
import HbeAfter from "../Header/HeaderBefore";
import {
    Button,
    TextField,
    Link,
    Grid,
    Container,
    Typography,
  } from "@material-ui/core";

function OauthJoin() {
    const params = useParams();


  const handleSubmit = (event) => {
    event.preventDefault();
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
    const data = new FormData(event.target);
    const address = data.get("address");
    const age = data.get("age");
    const nickname = data.get("nickname");
    const phonenumber = data.get("phonenumber");
    registration({ address:address, age:age, nickname: nickname, phoneNumber: phonenumber }).then(
      (response) => {
        // 계정 생성 성공 시 login페이지로 리디렉트
        window.location.href = "/1";
      }
    );
  };

  // 랜더링 할때 토큰을 불러와서 localhost에 
  useEffect(() => {
    console.log(params.token);
    localStorage.clear();
    localStorage.setItem("ACCESS_TOKEN", params.token);
  }, []);

  return (<>
        <header className="Header">
            <HbeAfter/>
        </header>
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  회원 정보 입력 하기 
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
                name="address"
                label="주소"
                id="address"
                autoComplete="current-address"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                name="age"
                label="나이"
                id="age"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                name="nickname"
                label="닉네임"
                id="nickname"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                name="phonenumber"
                label="전화번호"
                id="phonenumber"
                />
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                정보 입력 
                </Button>
            </Grid>
        </Grid>
            </form>
     
        </Container>
  
  </>);
}

export default OauthJoin;