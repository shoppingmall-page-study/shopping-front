import React, { useEffect, useRef, useState } from "react";
// import {useDaumPostcodePopup,DaumPostcodeEmbed} from "react-daum-postcode"
import "./join.css"
import {
  Button,
  TextField,
  Link,
  Grid,
  Container,
  Typography,
  // DialogActions,
} from "@material-ui/core";
import { emailCheck, nicknameCheck, signup } from "../Api/ApiService";
import Hbefore from "../Header/HeaderBefore";

const Join = () => {
  const [emailText,setEmailText] = useState("")
  const [nicknameText,setNicknameText] = useState("")
  useEffect(() => {
    const a = document.createElement("script");
    a.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(a);
    return () => {
      document.head.removeChild(a);
    }      
  },[]) //우편번호 스크립트 주소추가 및 삭제

  const addrView = useRef([]);

  const foldDaumPostcode = () => {
    addrView.current[0].style.display = 'none';
  }

  const HandleOnclick = () => {
    const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    new window.daum.Postcode({
      onComplete: (data) => {
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
        addrView.current[1].value = data.zonecode
        addrView.current[2].value = fullAddress

        addrView.current[3].focus()
        addrView.current[0].style.display = 'none';
        document.body.scrollTop = currentScroll;
      },
      onresize: (size) => {
        addrView.current[0].style.height = size.height+'px';
      },
      width: '100%',
      height: '100%'
    }).embed(addrView.current[0])
    addrView.current[0].style.display = 'block';
  }

 

  const handleSubmit = (event) => {
    event.preventDefault();
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const address = data.get("address")
    const age = data.get("age");
    const nickname = data.get("nickname");
    const phoneNumber = data.get("phoneNumber");
    const postCode = data.get("postCode")
    signup({ email: email,  password: password , username: username, address:address, age:age, nickname: nickname, phoneNumber: phoneNumber, postCode: postCode })
  };
  const HandlePhoneNumber = (e) => {
    e.target.value = e.target.value.substr(0,13)
    // e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/({1,2})$/g, "");
    e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
  }

  //닉네임 중복검사 함수
  const HandleNicknameCheck = (e) => {
    nicknameCheck(e.target.value).then((res) => {
      // e.target.helperText=res.data.message
      setNicknameText(res.data.msg)
    })
  }
  
  //이메일 중복검사 함수
  const HandleEmailCheck = (e) => {
    emailCheck(e.target.value).then((res) => {
      // e.target.helperText=res.data.message
      if(res.status==200){
        setEmailText(res.data.msg)
      }
      // console.log(res.data.status)
    })
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
          {/* <div className="email_check"> */}
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              name="email"
              autoComplete="email"
              // inputRef={el => (addrView.current[4] = el)}
              onChange={HandleEmailCheck}
              helperText={emailText}
            />
            {/* <button type="button" id="email_check_btn">중복체크</button> */}
          {/* </div> */}

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
              name="nickname"
              label="닉네임"
              id="nickname"
              fullWidth
              onChange={HandleNicknameCheck}
              helperText={nicknameText}
              // inputRef={el => (addrView.current[4] = el)}
            />
            {/* <button type="button" onClick={handleNicknameCheck} id="nickname_check_btn">중복체크</button> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="phoneNumber"
              label="전화번호"
              id="phonenumber"
              maxLength={13}
              className="c"
              onChange={HandlePhoneNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              size="small"
              placeholder="우편번호"
              id="num"
              inputRef={el => (addrView.current[1] = el)}
            />
            <button type='button' onClick={HandleOnclick} id="Addr_btn">우편번호 찾기</button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="postCode"
              placeholder="주소"
              id="postCode"
              inputRef={el => (addrView.current[2] = el)}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="address"
              placeholder="상세주소"
              inputRef={el => (addrView.current[3] = el)}
            />
            </Grid>
            <div ref={el => (addrView.current[0] = el)} className='style'>
              <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" onClick={foldDaumPostcode} alt="취소"/>
            </div>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              계정 생성
            </Button>
          </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              이미 계정이 있습니까? 로그인 하세요.
            </Link>
          </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
    </>
   
  );
};

export default Join;
