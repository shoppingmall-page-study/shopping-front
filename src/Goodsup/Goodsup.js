import { TextField } from "@material-ui/core";
// import axios from "axios";
import React, { useState, useEffect } from "react";
import Hafter from "../Header/HeaderAfter";
import { productCreate } from "../Api/ApiService";
import { userGet } from "../Api/ApiService";
import './Goodsup.css'
import axios from "axios";
function Goodsup({products, setProducts, cart}){
    const [file, setFile] = useState("");   //파일 미리볼 url을 저장해줄 state
    const [goodscount,setGoodsCount] = useState(1);   //  개수를 나타내는 Hooks
    const[files, setFiles] = useState([])
    const[user, setUser] = useState([]);

    useEffect(() => {
        userGet().then((res) =>{
            setUser(res.data.data);
        })
    }, [])

    const API_KEY = process.env.REACT_APP_IMAGE_API_KEY
    
    const saveFileimage = (e) =>{   //파일 저장함수
        e.preventDefault();
        setFile(URL.createObjectURL(e.target.files[0]));
        setFiles(e.target.files[0]);
        console.log(files);
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

        // 수정 
    
        console.log(files)
        data.append("image",files)  // data에 파일 담기 

        var instance = axios.create();
        delete instance.defaults.headers.common['Authorization'];



       
        let headers = new Headers({
         "Content-Type": "multipart/form-data",
       });
         instance.post(`https://api.imgbb.com/1/upload?key=ccc9bce509b3db7fd500bb3d3e79f8d0`,data,headers).then((response)=>{
            
            if(response.status === 200){
                console.log(response.data)
                console.log(response.data.data.url)
                const title = data.get("title") 
                const name = user.nickname;
                const price = data.get("price")
                const content = data.get("content")
                const total = goodscount
                const imgUrl = response.data.data.url
                productCreate({title: title, content: content, name: name, price: price, total: total, imgUrl: imgUrl})


            }else{
                alert(response.status)
            }
         })
       
       
        ///
        
        // console.log(title, content, name, price, total, imgUrl)
        //productCreate({title: title, content: content, name: name, price: price, total: total, imgUrl: imgUrl})
        // let formData = new FormData()
        // formData.append("file", e.target.Goods_img_file.files[0])
        // let dataSet = {
        //     title: e.target.title.value,
        //     name: e.target.name.value,
        //     price: e.target.price.value,
        //     content: e.target.content.value,
        //     total: goodscount
        // }
        // let blob = new Blob([JSON.stringify(dataSet)], {type: "application/json"})
        // formData.append("data", blob);
        // productCreate(formData)
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
                        <input type="file" name="Goods_img_file" onChange={saveFileimage} className="upload" multiple="multiple"/>
                    </div>
                    <div className="form_goodsup">
                        <TextField name="title" 
                            label="상품이름" 
                            className="goods_title"
                            variant="outlined"/>
                        <div className='floor'></div>
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
