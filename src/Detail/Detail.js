import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Hafter from '../Header/HeaderAfter';
import Hbefore from '../Header/HeaderBefore';
import { payMent } from "../Api/ApiService";
import { payMentComplete } from "../Api/ApiService";
// import getProducts from '../Service/Fetcher';
import { productGet, cartCreate, userGet, cartGet, reviewCreate, reviewGet, cartUpdate} from '../Api/ApiService';
import './Detail.css'
import Review from '../review/review';
import axios from "axios";
import {useRef} from 'react'

function Detail({convertPrice, cart, setCart, token, payList, setPayList }){

  const { id } = useParams();
  const [product, setProduct] = useState({}); //상품
  const [file, setFile] = useState("");   //파일 미리볼 url을 저장해줄 state
  const [count,setCount] = useState(1);   //  개수를 나타내는 Hooks
  const[files, setFiles] = useState("");
  const [payUser, setPayUser] = useState([]);
  // const [s,setS] = useState("a")
  const navigate = useNavigate()
  const Point = useRef([]);
  const getUserInfo = () => {
    userGet().then((res) =>{
      return res.data.data
  })
  }
  useEffect(() => {

    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    }      
},[])

  const handelQuantity = (type) => {  //  -,+버튼을 눌렀을때 개수 변화는 함수
    console.log(type + " " + count + " " + product.total);

      if(type === "plus"){
        if(count === product.total)return;
          setCount(count+1);
      }else{
          if(count === 1) return;
          setCount(count-1)
      }
  };
  useEffect(() => {
    productGet().then((res) => {
      setProduct(res.data.data.find((product) => product.productId === parseInt(id)));
    });
    console.log("product Hooks에 해당 상품번호 저장하기")
  }, [id]);
  // useEffect(() => {
  //   cartGet().then((res) => {
  //     setCart(res.data.data)
  //   })
  // },[s])
  const saveFileimage = (e) =>{   //파일 저장함수
    e.preventDefault();
    setFile(URL.createObjectURL(e.target.files[0]));
    setFiles(e.target.files[0]);

  };

  const deleteFileimage = () =>{
      URL.revokeObjectURL(file);
      
  };

  console.log(cart)

  const payment = (proId, proNum, product, buyer) => { 
    payMent({productsId: proId, productsNumber: proNum}).then((res) => {
        // console.log(res.data.data.orderId)
        const { IMP } = window;
        IMP.init('imp54601326');

        const data = {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: res.data.data.orderId,
        name: product.name,
        amount: res.data.data.amount,
        buyer_email: buyer.email,
        buyer_name: buyer.username,
        buyer_tel: buyer.phoneNumber,
        buyer_addr: buyer.address,
        buyer_postcode: buyer.postCode
        };
        console.log(data)
        IMP.request_pay(data, callback);
    })
    }

    const callback = (response) => {
      const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
      console.log(response)
      if(success){
          payMentComplete({impUid: imp_uid, orderId: merchant_uid}).then((res) => {
              console.log(res)
              res.status == 200 ? navigate("/payTrue") : alert(`결제 실패: ${error_msg}`);
          })
      }else{
          alert(`결제 실패: ${error_msg}`);
      }}

  const moveToPay = () => {
    cartCreate({productNum: count, productId: product.productId}).then((res) => {
      if(res.status === 200){
        setCart([...cart,res.data.data])
      }
    })
    window.location.href="../payment" //문제는 이렇게 하면 새로고침이 되기때문에 초기화가 된다...
  }

  const handleCart = () => {  //장바구니에 추가하는 함수
      const found = cart.find((el) => el.product.productId === product.productId)
      if(found){
        const idx = cart.indexOf(found)
        cartUpdate({cartId: found.cartId, productNum: found.productNum + count}).then((res)=>{
          if(res === undefined){
            alert("상품의 구매한도를 초과했습니다.")
          }else{
          if(res.status === 200){
            setCart([...cart.slice(0,idx), res.data.data, ...cart.slice(idx+1)])
          } 
        }})
      }else{
        cartCreate({productNum: count, productId: product.productId}).then((res) => {
                    if(res.status === 200){
                      setCart([...cart,res.data.data])
                    }
                  })
      }}

  const TokenHeaderView = (token) => {  //토큰 유무에 따른 헤더뷰어 함수
    return token ? <Hafter cart={cart}/> : <Hbefore/>
  }
  const HandleReivewUp = (e) => {
    e.preventDefault();
    const data = new FormData(e.target)



    data.append("image",files)
    var instance = axios.create();
    delete instance.defaults.headers.common['Authorization'];


    let headers = new Headers({
      "Content-Type": "multipart/form-data",
    });

    instance.post(`https://api.imgbb.com/1/upload?key=ccc9bce509b3db7fd500bb3d3e79f8d0`,data,headers).then((response)=>{
      if(response.status === 200){
        const title = data.get("title")
        const content = data.get("content")
        const imgUrl = response.data.data.url
        reviewCreate({imgUrl: imgUrl, title: title, content: content, productId: product.productId}).then((response) => {
          if(response === undefined){
            alert("리뷰등록에 실패하였습니다.")
          }else{
          if(response.status === 200){
            alert(response.data.msg)
            setFile("");
            setFiles("");
            setState("look")
          }else{
            alert(response.data.msg)
          }
        }})


      }else{
        alert(response.status)
      }
    })


    
    
  }
  const [state,setState] = useState("look"); //리뷰 창 상태 저장
  const [reviewlist,setReviewList] = useState([]) //리뷰 목록들

  useEffect(()=>{
    reviewGet(id).then((res) => {
      setReviewList(res.data.data)
    })
  },[state])
  return(
    product && (
    <main>
      <div className='Header'>
        {TokenHeaderView(token)}
      </div>
      <div className='Content'>
        <div className='main'>
          <div className='main_wrap_grid'>
            <section className='detail  '>
              <div className="detail_img">
                {/* <img src={product.image} alt={product.id} /> */}
                <img className = "detail_img"src={product.imgUrl} alt={product.productId} />
              </div>
            </section>
            <section className='detail'>
              <div className="detail_info0">
                <p className="detail_product_name0">{product.title}</p>
                <div className='line'></div>
                <span className="detail_product_price0">
                  {convertPrice(product.price+"")}
                  <span className="detail_product_unit0">원</span>

                  <div className='line'></div>
                </span>
                {/* <div className='product_info'>{product.provider}</div> */}
                <div className='product_info0'>{product.content}</div>
                <div className='line'></div>
              </div>
              <div className='pay0'>
                <span className='soo0'>수량 : </span>
                <div className="amount">
                  <img
                    className="minus"
                    src="/images/icon-minus-line.svg"
                    alt="minus"
                    onClick={()=>handelQuantity("minus")}
                  />

                  <div className="count">
                    <span>{count}</span>
                  </div>

                  <img
                    className="plus"
                    src="/images/icon-plus-line.svg"
                    alt="plus"
                    onClick={()=>handelQuantity("plus")}
                  />
                </div>
              </div>
              <div className='line'></div>
              <div className="sum">
                <div className="total_info0">
                  <div className='sum_price_wd0'><span className="sum_price0">총 상품 금액</span></div>                
                  <div className='total_price0'>
                      <span className="total_count0">총 수량 : {count}개</span>
                      <span className="total_price1">
                        {convertPrice(product.price*count)}                  
                        <span className="total_unit1">원</span>
                      </span>
                  </div>
                </div>
              </div>
              <div className="button_detail">
                <button className="button_buy0" onClick={()=>payment([product.productId], [count], product, getUserInfo)}>바로 구매</button>
                <button className="button_cart0" onClick={()=>handleCart()}>장바구니</button>
              </div>
            </section>
          </div>
          <div className="review-content0">
          <div className='review-title-box0'>
            <p className='review-title0'>review</p>
          </div>
          <div className='review-btn0'>
            <button className='btn-review-up0' onClick={()=>setState("up")}>등록</button>
            <button className='btn-review-look0' onClick={()=>setState("look")}>보기</button>
          </div>
          <div className='pop'>
            { state === "up" ?
            <form id="review-up-form" onSubmit={HandleReivewUp}> 
              <div className="sample_reveiw_img_wd">
                          <img className="sample_review_img"
                              // alt="sample"
                              src={file}
                          />
              <input required type="file" name='imgUrl' onChange={saveFileimage} className='review_img_upload' multiple="multiple"/>
            </div>
            <div className='input_review'>
              <TextField name="title"
                label="제목" 
                fullWidth
                // className="review-up-title"
                variant="outlined"
                multiline
                required
                maxRows={2}/>
              <div className='review-up-line'></div>
              <TextField name="content"
                label="내용" 
                fullWidth
                // className="review-up-content"
                variant="outlined"
                required
                multiline
                maxRows={3}/>
              <div className='review-up-btn-box'>
                <button type='submit' onClick={deleteFileimage} className='review-up-btn'>등록하기</button>
              </div>
              </div>
            </form>
            :
            <div id="review-look-form">
            { reviewlist.length === 0 ?(
            <p>해당 상품에 등록된 리뷰가 없습니다.</p>)
            : reviewlist.map((reviewlist) => {
              return <Review key={`reviewkey-${reviewlist.reviewId}`} reviewlist={reviewlist} setReviewList={setReviewList}/>
            })
            }
            </div>
            }
          </div>
        </div>
        </div>
      </div>
      <footer>
      </footer>
    </main>
  )
  );
}
export default Detail;