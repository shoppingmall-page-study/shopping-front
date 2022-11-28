import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import {Link, useParams} from "react-router-dom";
import { reviewUpdate } from "../../Api/ApiService";
import Hafter from '../../Header/HeaderAfter';
import UserMenuBar from "../userMenuBar";
// import ReviewContent from "./reviewContent"
import "./reviewModify.css"
import axios from "axios";

function ReviewModify({reviewSelect, setReviewSelect, cart, setCart}){
    const [file,setFile] = useState(reviewSelect.imgUrl)
    const[files, setFiles] = useState(reviewSelect.imgUrl)
    const navigate = useNavigate()
    const HandleReviewUpdate = (e) => {
        e.preventDefault()
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
            reviewUpdate({reviewId: reviewSelect.reviewId, imgUrl: imgUrl, title: title, content: content}).then((response) => {
                if(response === undefined){
                    alert("리뷰수정에 실패하였습니다.")
                }else{
                if(response.status === 200){
                  alert(response.data.msg)
                  navigate("/UserReviewList")
                }
              }})
        }else{
            alert(response.data.msg)
        }
      })
        deleteFileimage()
    }

    const saveFileReviewimage = (e) => {
        e.preventDefault();
        setFile(URL.createObjectURL(e.target.files[0]));
        setFiles(e.target.files[0]);
    }

    const deleteFileimage = () =>{
        URL.revokeObjectURL(file);
    };

    const HandleMoveReviewListPage = () =>{
        navigate("/UserReviewList")
    }
    return(
        <div>
            <div className="Header">
                <Hafter cart={cart} setCart={setCart}/>
            </div>
            <div className="Content">
            <p id="review_modify_title">리뷰수정</p>
                <div className="flex_reviewModifyContent">
                    {/* <UserMenuBar/> */}
                    {/* <div className="user_review_window">
                    {userReview.length === 0 ?(
                        <div className="not_userReivew">
                            <p>사용자가 등록한 리뷰목록이 존재하지 않습니다.</p>
                        </div>
                    ): userReview.map((userReview) => {
                        return <ReviewContent key={`userreviewkey-${userReview.reviewId}`} userReview={userReview} setUserReview={setUserReview}/> 
                    })
                    }
                    </div> */}
                    {/* <form className="user_review_modify_window" onSubmit={HandleReviewUpdate}>
                        <div className="user_reviewModifylist_window">
                            <div>
                                <TextField name="user_review_title"
                                required
                                label="제목" 
                                className="reviewUpdate_title"
                                variant="outlined"
                                defaultValue={reviewSelect.title}
                                multiline
                                maxRows={2}/>
                            </div>
                            <div className="user_reviewModifylist_line"></div>
                            <div className="user_reviewModifylist_content">
                                <TextField name="reviewUpdate_content"
                                required
                                label="내용" 
                                className="reviewUpdate_content"
                                variant="outlined"
                                defaultValue={reviewSelect.content}
                                multiline
                                maxRows={4}/>
                            </div>
                        </div>
                        <div className="user_reivewModify_form">
                            <div className="user_reiveModify_btn">
                                <button type="submit">완료</button>
                            </div>
                        </div>
                    </form> */}
                    <form onSubmit={HandleReviewUpdate} className="user_review_modify_window">
                    <div className="user_reviewModifylist_window">
                        <div className="reviewModifyimg_look">
                            {/* <div className="reviewModifysample_img_wd"> */}
                                <img className="reviewModifysample_img"
                                    alt="sample"
                                    src={file}
                                />
                            {/* </div> */}
                            <input type="file" name="GoodsModify_img_file" onChange={saveFileReviewimage} className="GoodsModifyupload"/>
                        </div>
                        <div className="reviewInfo_form">
                            <TextField name="title"
                                required
                                label="제목" 
                                // className="goodsModify_title"
                                variant="outlined"
                                fullWidth
                                defaultValue={reviewSelect.title}/>
                            <div className='floor1'></div>
                            <TextField name="content"
                                required
                                label="설명"
                                // className="Goods_explain"
                                variant="outlined"
                                multiline
                                fullWidth
                                maxRows={2}
                                defaultValue={reviewSelect.content}/>
                        </div>
                    </div>
                    <div className="review_success_wd1">
                        {/* <Link to="/UserReviewList" className="reviewList_return">돌아가기</Link> */}
                        <button type="button" className="success0" onClick={HandleMoveReviewListPage}>돌아가기</button>
                        <button type="submit" className="success1">완료</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ReviewModify;