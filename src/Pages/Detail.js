import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Hafter from '../Header/HeaderAfter';
import Hbefore from '../Header/HeaderBefore';
import getProducts from '../Service/Fetcher';
import './Detail.css'

function Detail({convertPrice, cart, setCart}){
    const { id } = useParams();
    const [product, setProduct] = useState({});
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
        getProducts().then((data) => {
            setProduct(data.data.products.find((product) => product.id === parseInt(id)));
        });
    },[id]);

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
    
    return(
      product && (
      <main>
        <div className='Header'>
          <Hafter cart={cart}/>
        </div>
        <div className='main'>
          <section className='detail'>
            <div className="detail_img">
              <img src={product.image} alt={product.id} />
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
      </main>
    )
    );
}
export default Detail;