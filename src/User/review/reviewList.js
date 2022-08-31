import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { userReviewGet } from "../../Api/ApiService";
import Hafter from '../../Header/HeaderAfter';
import UserMenuBar from "../userMenuBar";
import ReviewContent from "./reviewContent"
import "./reviewList.css"

function ReviewList(){
    const [userReview, setUserReview] = useState([])    //사용자가 단 리뷰 목로들이 저장될 Hooks
    const {id} = useParams();
    useEffect(() => {
        userReviewGet().then((res) => {
            setUserReview(res.data.data)
        })
    },[id])
    console.log(userReview)
    return(
        <div>
            <div className="Header">
                <Hafter/>
                <h1 id="review_title">리뷰목록</h1>
            </div>
            <div className="Content">
                <div className="flex_userContent">
                    <UserMenuBar/>
                    <div className="user_review_window">
                    {userReview.length === 0 ?(
                        <div className="not_userReivew">
                            <p>사용자가 등록한 리뷰목록이 존재하지 않습니다.</p>
                        </div>
                    ): userReview.map((userReview) => {
                        return <ReviewContent key={`userreviewkey-${userReview.productId}`} userReview={userReview} setUserReview={setUserReview}/> 
                    })
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReviewList;