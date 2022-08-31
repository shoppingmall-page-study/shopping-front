import { reviewDelete } from "../../Api/ApiService";
import "./reviewList.css"

function ReviewContent({userReview, setUserReview}){

    const HandleUserReviewListUpdate = (e) => {
        e.preventDefault();
    }
    const HandleUserReviewListRemove = (e) => {
        e.preventDefault();
        reviewDelete(userReview.productId)
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
            <div className="user_reivewlist_form">
                <form className="user_reivewlist_btn" onSubmit={HandleUserReviewListUpdate}>
                    <button type="submit" name="modify">수정</button>
                </form>
                <form className="user_reivewlist_btn" onSubmit={HandleUserReviewListRemove}>
                    <button type="submit" name="delete">삭제</button>
                </form>
            </div>
        </section>
    );
}
export default ReviewContent