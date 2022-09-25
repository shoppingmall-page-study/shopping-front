import { TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Hafter from "../../Header/HeaderAfter";
import { productCreate } from "../../Api/ApiService";
import UserMenuBar from "../userMenuBar";
import "./userGoodsUp.css"
import { userProductUpdate } from "../../Api/ApiService";

function UserGoodsUpModify({convertPrice, productSelect, setProductSelect}){
    const [count,setCount] = useState(productSelect.total)  //해당 등록상품의 개수를 저장할 Hooks
    const [file,setFile] = useState(productSelect.imgUrl) //해당 등록상품의 이미지를 미리 보여줄 저장 Hooks

    const HandleUpEvent = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const imgUrl = file
        const title = data.get("title")
        const name = data.get("name")
        const content = data.get("content")
        const price = data.get("price")
        const total = count
        
        userProductUpdate({productId: productSelect.productId, imgUrl: imgUrl, title: title, name: name, content: content, price: price, total: total})
        URL.revokeObjectURL(file);
    } 

    const handelQuantity = (type) => {
        if(type == "plus"){
            setCount(count + 1)
        }else {
            if(count == 1)return;
            setCount(count - 1)
        }
    }

    const saveFileimage = (e) => {
        e.preventDefault();
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return(
        <div className="GoodsUp">
            <header className="Header">
                <Hafter/>
            </header>
            <div className="Content">
                <div className="userGoodsModify_flex_content">
                    <UserMenuBar/>
                    <form onSubmit={HandleUpEvent} className="userGoodsModify_window">
                    <div className="goodsModify_info">
                        <div className="goodsModifyimg_look">
                            <div className="goodsModifysample_img_wd">
                                <img className="goodsModifysample_img"
                                    alt="sample"
                                    src={file}
                                />
                            </div>
                            <input type="file" name="GoodsModify_img_file" onChange={saveFileimage} className="GoodsModifyupload"/>
                        </div>
                        <div className="ModifyInfo_form">
                            <TextField name="title"
                                required
                                label="제목" 
                                className="goodsModify_title"
                                variant="outlined"
                                defaultValue={productSelect.title}/>
                            <div className='floor'></div>
                            <TextField name="name"
                                required
                                label="상품이름"                           
                                className="goodsModify_name"
                                variant="outlined"
                                defaultValue={productSelect.name}/>
                            <div className='floor'></div>
                            <TextField name="price"
                                required
                                label="가격"
                                className="goodsModify_price"
                                variant="outlined"
                                defaultValue={productSelect.price}/>
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
                            <div className='floor'></div>
                            <TextField name="content"
                                required
                                label="설명"
                                className="Goods_explain"
                                variant="outlined"
                                multiline
                                maxRows={2}
                                defaultValue={productSelect.content}/>
                        </div>
                    </div>
                    <div className="success_wd">
                        <button type="submit" className="success">완료</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );    
}
export default UserGoodsUpModify;