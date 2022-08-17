import { TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Hafter from "../Header/HeaderAfter";
import { productCreate } from "../Api/ApiService";
import './Goodsup.css'

function Goodsup({products, setProducts, cart}){
    const [file, setFile] = useState("");   //파일 미리볼 url을 저장해줄 state
    const [goodscount,setGoodsCount] = useState(1);   //  개수를 나타내는 Hooks
    
    const saveFileimage = (e) =>{   //파일 저장함수
        setFile(URL.createObjectURL(e.target.files[0]));
        console.log(file)
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

    const HandleUpEvent = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target)
        const title = data.get("title")
        const name = data.get("name")
        const price = data.get("price")
        const content = data.get("content")
        const total = goodscount
        const imgUrl = file
        productCreate({title: title, content: content, name: name, price: price, total: total, imgUrl: imgUrl});
        deleteFileimage()
    }

    return(
        <div className="GoodsUp">
            <header className="Header">
                <Hafter cart={cart}/>
            </header>
            <div className="Content">
                <form onSubmit={HandleUpEvent}>
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
                        <TextField name="title" 
                            label="제목" 
                            className="goods_title"
                            variant="outlined"/>
                        <div className='floor'></div>
                        <TextField name="name" 
                            label="상품이름"                           
                            className="goods_name"
                            variant="outlined"/>
                        <div className='floor'></div>
                        <TextField name="price"
                            label="가격"
                            className="goods_price"
                            variant="outlined"/>
                        <div className='floor'></div>
                        <div className='pay'>
                            <span className='soo'>수량 : </span>
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
                        <div className='floor'></div>
                        <TextField name="content"
                            label="설명"
                            className="Goods_explain"
                            variant="outlined"
                            multiline
                            maxRows={2}/>
                    </div>
                </div>
                <div className="Register_wd">
                    <button type="submit" className="Register">등록하기</button>
                </div>
                </form>
            </div>
        </div>
    );    
}
export default Goodsup;