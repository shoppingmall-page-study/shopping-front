import { reviewDelete } from "../../Api/ApiService";
import "./reviewList.css"

function ReviewContent({userReview, setUserReview}){

    const HandleUserReviewListUpdate = () => {

    }
    const HandleUserReviewListRemove = () => {
        reviewDelete(userReview.reviewId)
    }
    return(
        <section>
            <div  className="user_reviewlist_window">
                <div className="user_reviewlist_title">
                    <p>{userReview.title}</p>
                </div>
                <div className="uer_reviewlist_line"></div>
                <div className="user_reviewlist_content">
                    <p>{userReview.content}</p>
                    <div className="user_nickname_cal">
                        <span>닉네임!!!!!!</span>
                        <span>등록일: 20202020202020</span>
                    </div>
                </div>
            </div>
            <form className="user_reivewlist_btn" onSubmit={HandleUserReviewListRemove()}>
                {/* <button type="submit">수정</button> */}
                <button type="submit">삭제</button>
            </form>
        </section>
    );
}
export default ReviewContent