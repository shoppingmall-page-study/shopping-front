import React, { useState } from "react";
import {useDaumPostcodePopup} from "react-daum-postcode"

import {
  Button,
  TextField,
  Link,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import { signup } from "../Api/ApiService";
import Hbefore from "../Header/HeaderBefore";

const Join = () => {
  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    console.log(data.zonecode)
  };

  const handleClick = () => {
    open({onComplete: handleComplete});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const address = data.get("address");
    const age = data.get("age");
    const nickname = data.get("nickname");
    const phonenumber = data.get("phonenumber");
    const postCode = data.get("postCode")
    console.log(phonenumber)
    signup({ email: email,  password: password , username: username, address:address, age:age, nickname: nickname, phoneNumber: phonenumber, postCode: postCode }).then(
      (response) => {
        // 계정 생성 성공 시 login페이지로 리디렉트
         window.location.href = "/login";
      }
    );
  };
  const HandlePhoneNumber = (e) => {
    e.target.value = e.target.value.substr(0,13)
    e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
  }
  return (
    <>
    <header className="Header">
            <Hbefore/>
        </header>
     <Container className="Content" component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              계정 생성
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="유저 이름"
              autoFocus
            />
          </Grid>
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
          {/* <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="address"
              label="주소"
              id="address"
              autoComplete="current-address"
            />
          </Grid> */}
          <button type="button" onClick={handleClick}>우편번호 검색</button>
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
              maxLength={13}
              onChange={HandlePhoneNumber}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="postCode"
              label="우편번호"
            />
          </Grid> */}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              계정 생성
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              이미 계정이 있습니까? 로그인 하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
    </>
   
  );
};

export default Join;
