import axios from "axios";
import React, { useState } from "react";
import Hafter from "../Header/HeaderAfter";
import './Goodsup.css'

function Goodsup({products, setProducts, cart}){
    const [file, setFile] = useState("");   //파일 미리볼 url을 저장해줄 state
    const [goodscount,setGoodsCount] = useState(1);   //  개수를 나타내는 Hooks
    
    const saveFileimage = (e) =>{   //파일 저장함수
        setFile(URL.createObjectURL(e.target.files[0]));
    };

    const deleteFileimage = () =>{
        URL.revokeObjectURL(file);
        setFile("");
    };
    
    const handelQuantity = (type) => {  //  -,+버튼을 눌렀을때 개수 변화는 함수
        if(type === "plus"){
            setGoodsCount(goodscount+1);
        }else{
            if(goodscount === 1) return;
            setGoodsCount(goodscount-1)
        }
    };

    return(
        <div className="GoodsUp">
            <header className="Header">
                <Hafter cart={cart}/>
            </header>
            <div className="content">
                <div className="goods_info">
                    <div className="img_look">
                        <div className="sample_img_wd">
                            {file && (<img className="sample_img"
                                alt="sample"
                                src={file}
                            />
                            )}
                        </div>
                        <input type="file" name="Goods_img_file" onChange={saveFileimage} className="upload"/>
                    </div>
                    <div className="form_goodsup">
                        <input type="text" name="Goods_name" placeholder="이름" className="goods_name"/>
                        <div className="line"></div>
                        <input type="price" name="Goods_price" placeholder="가격" className="goods_price"/>
                        <div className="line"></div>
                        <input type="text" name="Seller_an" placeholder="판매자 계좌번호" className="Seller_an"/>
                        <div className="line"></div>
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
                                <span>{goodscount}</span>
                                </div>

                                <img
                                className="plus"
                                src="/images/icon-plus-line.svg"
                                alt="plus"
                                onClick={()=>handelQuantity("plus")}
                                />
                            </div>
                        </div>
                        <input type="text" name="Goods_explain" className="Goods_explain"/>
                    </div>
                </div>
                <div className="Register_wd">
                    <button onClick={()=>{deleteFileimage();}} className="Register">등록하기</button>
                </div>
            </div>
        </div>
    );    
}
export default Goodsup;