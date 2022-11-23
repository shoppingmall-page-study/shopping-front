import { TextField } from "@material-ui/core";
// import axios from "axios";
import React, { useState } from "react";
import Hafter from "../../Header/HeaderAfter";
// import { productCreate } from "../../Api/ApiService";
import UserMenuBar from "../userMenuBar";
import "./userGoodsUp.css"
import { userProductUpdate } from "../../Api/ApiService";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UserGoodsUpModify({convertPrice, productSelect, setProductSelect, cart}){
    const [count,setCount] = useState(productSelect.total)  //해당 등록상품의 개수를 저장할 Hooks
    const [file,setFile] = useState(productSelect.imgUrl) //해당 등록상품의 이미지를 미리 보여줄 저장 Hooks
    const[files, setFiles] = useState(productSelect.imgUrl)

    const navigate = useNavigate()
    const HandleUpEvent = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)


        console.log(files)
        data.append("image",files)  // data에 파일 담기 

        var instance = axios.create();
        delete instance.defaults.headers.common['Authorization'];



       
        let headers = new Headers({
         "Content-Type": "multipart/form-data",
       });
       instance.post(`https://api.imgbb.com/1/upload?key=ccc9bce509b3db7fd500bb3d3e79f8d0`,data,headers).then((response)=>{
            if(response.status === 200){
                const title = data.get("title")
                const name = data.get("name")
                const content = data.get("content")
                const price = data.get("price")
                const total = count
                const imgUrl = response.data.data.url
                userProductUpdate({productId: productSelect.productId, imgUrl: imgUrl, title: title, name: name, content: content, price: price, total: total}).then((response) => {
                    if(response === undefined){
                        alert("해당 등록상품의 삭제에 실패하였습니다.")
                    }else{
                    if(response.status === 200){
                      alert(response.data.msg)
                      navigate("/UserProducList")
                    }else{
                        alert(response.data.msg)
                    }
                  }})
            }else{
                alert(response.status)
            }
       })

        //const imgUrl = file
        //const title = data.get("title")
        //const name = data.get("name")
       // const content = data.get("content")
        //const price = data.get("price")
        //const total = count
        
        //userProductUpdate({productId: productSelect.productId, imgUrl: imgUrl, title: title, name: name, content: content, price: price, total: total})
        URL.revokeObjectURL(file);
    } 

    const handelQuantity = (type) => {
        if(type === "plus"){
            setCount(count + 1)
        }else {
            if(count === 1)return;
            setCount(count - 1)
        }
    }

    const saveFileimage = (e) => {
        e.preventDefault();
        setFile(URL.createObjectURL(e.target.files[0]));
        setFiles(e.target.files[0]);
    }

    const HandleMoveGoodsListPage = () => {
        navigate("/UserProducList")
    }
    return(
        <div className="GoodsUp">
            <header className="Header">
                <Hafter cart={cart}/>
            </header>
            <div className="Content">
                <p id="user_goodsup_modify_title">등록상품수정</p>
                {/* <div className="userGoodsModify_flex_content"> */}
                    {/* <UserMenuBar/> */}
                    <form onSubmit={HandleUpEvent}>
                    <div className="goodsModify_info">
                        <div className="goodsModifyimg_look">
                            <div className="goodsModifysample_img_wd">
                                <img className="goodsModifyimg_look0"
                                    alt="sample"
                                    src={file}
                                />
                            </div>
                            <input type="file" name="GoodsModify_img_file" onChange={saveFileimage} className="GoodsModifyupload"/>
                        </div>
                        <div className="ModifyInfo_form">
                            <TextField name="title"
                                required
                                label="상품이름" 
                                fullWidth
                                // className="goodsModify_title"
                                variant="outlined"
                                defaultValue={productSelect.title}/>
                            <div className='floor'></div>
                            <TextField name="name"
                                required
                                fullWidth
                                label="판매자"                           
                                // className="goodsModify_name"
                                variant="outlined"
                                defaultValue={productSelect.name}/>
                            <div className='floor'></div>
                            <TextField name="price"
                                required
                                fullWidth
                                label="가격"
                                // className="goodsModify_price"
                                variant="outlined"
                                defaultValue={productSelect.price}/>
                            <div className='floor'></div>
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
                            <div className='floor'></div>
                            <TextField name="content"
                                required
                                label="설명"
                                fullWidth
                                // className="Goods_explain"
                                variant="outlined"
                                multiline
                                maxRows={2}
                                defaultValue={productSelect.content}/>
                        </div>
                    </div>
                    <div className="success_wd0">
                        <button type="button" className="GoodsUpdate_Btn0" onClick={HandleMoveGoodsListPage}>돌아가기</button>
                        <button type="submit" className="GoodsUpdate_Btn1">완료</button>
                    </div>
                    </form>
                {/* </div> */}
            </div>
        </div>
    );    
}
export default UserGoodsUpModify;