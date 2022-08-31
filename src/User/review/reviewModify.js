import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { userReviewGet } from "../../Api/ApiService";
import Hafter from '../../Header/HeaderAfter';
import UserMenuBar from "../userMenuBar";
import ReviewContent from "./reviewContent"

function ReviewModify(){
    return(
        <div>
            <div className="Header">
                <Hafter/>
                <h1 id="review_title">리뷰수정</h1>
            </div>
            <div className="Content">
                <div className="flex_userContent">
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
                    <div className="user_review_window">
                    <div  className="user_reviewlist_window">
                        <div className="user_reviewlist_title">
                            <TextField name="user_review_title"
                            label="제목" 
                            className="reviewUpdate_title"
                            variant="outlined"/>
                            <TextField name="reviewUpdate_content"
                            label="내용" 
                            className="review-up-content"
                            variant="outlined"/>
                        </div>
                        <div className="uer_reviewlist_line"></div>
                            <div className="user_reviewlist_content">
                                {/* <p>{userReview.content}</p> */}
                                {/* <div className="user_nickname_cal">
                                    <span>닉네임 : {.useuserReviewrNickName}</span>
                                    <span>등록일 : {userReview.reviewCreateTime}</span>
                                </div> */}
                            </div>
                        </div>
                    <div className="user_reivewlist_form">
                        <form className="user_reivewlist_btn">
                            <button type="submit" name="delete">완료</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
export default ReviewModify;