import { TextField } from "@material-ui/core";
import React,{ useEffect, useRef, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { reviewUpdate, userReviewGet } from "../../Api/ApiService";
import Hafter from '../../Header/HeaderAfter';
import UserMenuBar from "../userMenuBar";
import ReviewContent from "./reviewContent"
import "./reviewModify.css"

function ReviewModify({reviewSelect, setReviewSelect}){
    const HandleReviewUpdate = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const title = data.get("user_review_title")
        const content = data.get("reviewUpdate_content")
        reviewUpdate({reviewId: reviewSelect.reviewId, title: title, content: content})
    }

    return(
        <div>
            <div className="Header">
                <Hafter/>
                <h1 id="review_modify_title">리뷰수정</h1>
            </div>
            <div className="Content">
                <div className="flex_reviewModifyContent">
                    <UserMenuBar/>
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
                    <form className="user_review_modify_window" onSubmit={HandleReviewUpdate}>
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
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ReviewModify;