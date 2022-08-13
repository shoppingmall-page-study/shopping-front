import { TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Hafter from '../Header/HeaderAfter';
import Hbefore from '../Header/HeaderBefore';
import getProducts from '../Service/Fetcher';
import './Detail.css'

function Detail({convertPrice, cart, setCart, token}){
    const { id } = useParams();
    const [product, setProduct] = useState({}); //상품
    //서버 작동 시
    //const [review, setReview] = useState({}); 리뷴
    const [count,setCount] = useState(1);   //  개수를 나타내는 Hooks

    const handelQuantity = (type) => {  //  -,+버튼을 눌렀을때 개수 변화는 함수
        if(type === "plus"){
            setCount(count+1);
        }else{
            if(count === 1) return;
            setCount(count-1)
        }
    };

    useEffect(()=>{
        getProducts().then((response) => {
            setProduct(response.data.products.find((product) => product.id === parseInt(id)));
        });
        //서버 작동 시
        // axios.get("/rpoduct/review").then((res) => {
        //   setReview(res.data.data.find((inf) => inf.id === pareseInt(id)));
        // });
    },[id]);

    //서버 작동 시
    // useEffect(() => {
    //   getProducts().then((res) => {
    //     setProduct(res.data.data.find((product) => product.id === parseInt(id)));
    //   });
    // }, [id]);

    const setQuantity = (id, quantity) => { //장바구니 물건=> 중복된 물건인 경우
        const found = cart.filter((el) => el.id === id)[0];
        const idx = cart.indexOf(found);
        const cartItem = {
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
            provider: product.provider,
            quantity: quantity
        };
        setCart([...cart.slice(0,idx), cartItem,...cart.slice(idx+1)]);
    };

    //서버 작동 시
    // const setQuantity = (id, quantity) => {
    //   axios.delete(`/cart/list/${id}`);
    //   axios({
    //     method: 'post',
    //     url: `/cart/list/${id}`,
    //     data: {
    //       title: product.title,
    //       name: product.name,
    //       content: product.content,
    //       price: product.price,
    //       total: count,
    //       imgUrl: product.imgUrl
    //       }
    //   })
    // }
    const handleCart = () =>{   //장바구니에 추가되는 함수
        const cartItem = {
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
            provider: product.provider,
            quantity: count
        };
        const found = cart.find((el) => el.id === cartItem.id);
        if(found) setQuantity(cartItem.id, found.quantity + count);
        else setCart([...cart, cartItem]);
    };

    //서버 작동 시
    // const handleCart1 = () => {
    //   const found = [];
    //   axios.get("/cart/list").then((res)=>{
    //     found = res.data.find((el) => el.id === product.id);
    //   });
    //   if(found) setQuantity(product.id, found.count + count)
    //   else{
    //       axios({
    //       method: 'post',
    //       url: `/cart/create/${product.id}`,
    //       data: {
    //       title: product.title,
    //       name: product.name,
    //       content: product.content,
    //       price: product.price,
    //       total: count,
    //       imgUrl: product.imgUrl
    //       }
    //     })
    //   }
    // }

    const TokenHeaderView = (token) => {  //토큰 유무에 따른 헤더뷰어 함수
      return token ? <Hafter cart={cart}/> : <Hbefore/>
    }
    
    //서버 작동 시
    //리뷰 등록
    // const HandleReviewUp = (e) => {
    //   e.preventDefault();
    //   const data = new FormData(e.target)
    //   const reviewTitle = data.get("reviewuptitle")
    //   const reviewContent = data.get("reviewupcontent")

    //   axios({
    //     method: 'post',
    //     url: `review/create/${product.id}`,
    //     data: {
    //       reviewTitle: reviewTitle,
    //       reviewContent: reviewContent
    //     }
    //   })
    // }

    const [state,setState] = useState("look"); //리뷰 창 상태 저장
    return(
      product && (
      <main>
        <div className='Header'>
          {TokenHeaderView(token)}
        </div>
        <div className='Content'>
          <div className='main'>
            <section className='detail'>
              <div className="detail_img">
                <img src={product.image} alt={product.id} />
                {/* 서버 작동 시
                <img src={product.imgUrl} alt={product.id} /> */}
              </div>
            </section>
            <section className='detail'>
              <div className="detail_info">
                <p className="detail_product_name">{product.name}</p>
                <div className='line'></div>
                <span className="detail_product_price">
                  {convertPrice(product.price+"")}
                  <span className="detail_product_unit">원</span>
                  <div className='line'></div>
                </span>
                <div className='product_info'>{product.provider}</div>
                {/* 서버 작동 시
                <div className='product_info'>{product.content}</div> */}
              </div>
              <div className='pay'>
                <span className='soo'>수량 : </span>
                <div className='line'></div>
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
              <div className="sum">
                <div className="total_info">
                  <div className='sum_price_wd'><span className="sum_price">총 상품 금액</span></div>                
                  <div className='total_price0'>
                      <span className="total_count">총 수량 : {count}개</span>
                      <span className="total_price1">
                        {convertPrice(product.price*count)}                  
                        <span className="total_unit">원</span>
                      </span>
                  </div>
                </div>
              </div>
              <div className="button">
                <button className="button_buy">바로 구매</button>
                <button className="button_cart" onClick={()=>handleCart()}>장바구니</button>
              </div>
            </section>
          </div>
          <div className="review-content">
            <div className='review-title-box'>
              <p className='review-title'>review</p>
            </div>
            <div className='review-btn'>
              <button className='btn-review-up' onClick={()=>setState("up")}>등록</button>
              <button className='btn-review-look' onClick={()=>setState("look")}>보기</button>
            </div>
            <div className='pop'>
              { state === "up" ?
              <form id="review-up-form"> 
              {/* onSubmit={HandleReviewUp}> */}
                <TextField name="reviewuptitle"
                  label="제목" 
                  className="review-up-title"
                  variant="outlined"
                  multiline
                  maxRows={2}/>
                <div className='review-up-line'></div>
                <TextField name="reviewupcontent"
                  label="내용" 
                  className="review-up-content"
                  variant="outlined"
                  multiline
                  maxRows={4}/>
                <div className='review-up-btn-box'>
                  <button className='review-up-btn'>등록하기</button>
                </div>
              </form>
              :
              <div id="review-look-form">
                <h3>gg</h3>
              </div>
              }
            </div>
          </div>
        </div>
      </main>
    )
    );
}
export default Detail;