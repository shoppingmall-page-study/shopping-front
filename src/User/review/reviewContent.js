import { reviewDelete } from "../../Api/ApiService";
import { Link, useNavigate } from "react-router-dom";
import "./reviewList.css"

function ReviewContent({userReview, setUserReview, Review, setReviewSelect}){
    const navigate = useNavigate()
    const HandleUserReviewListRemove = (e) => {
        e.preventDefault();
        reviewDelete(Review.reviewId).then((response) => {
            if(response === undefined){
             alert("리뷰삭제에 실패하였습니다.")   
            }else{
            if(response.status === 200){
                const found = userReview
                alert(response.data.msg)
                setUserReview(found.filter((el) => el.reviewId !== Review.reviewId))
                navigate("/UserReviewList")
            }else{
              alert(response.data.msg)
            }
          }})
    }

    const NowReviewList = () => {
        setReviewSelect(userReview)
    }
    // console.log(userReview)

    const HandleMoveReviewUpdatePage = () => {
        setReviewSelect(Review)
        navigate("/UserReviewList/Modify")
    }
    return(
        <section>
            <div  className="user_reviewlist_window">
                <div>
                    <img className="reviewlist_look_img" src={Review.imgUrl} alt="sample"/>
                </div>
                <div className="reviewlist_title_content_view">
                    <div className="user_reviewlist_title">
                        <p>{Review.title}</p>
                    </div>
                    <div className="uer_reviewlist_line"></div>
                    <div className="user_reviewlist_content">
                        <p>{Review.content}</p>
                    </div>
                    <div className="user_nickname_cal">
                            {/* <span>닉네임 : {userReview.userNickName}</span> */}
                        <span id="uplode_day">등록일 : {Review.modifiedTime}</span>
                    </div>
                </div>
            </div>
            <div className="user_reivewlist_form">
                {/* <div className="user_reivewlist_a_form">
                    <span><Link id="user_reivewlist_a" to="/UserReviewList/Modify" onClick={NowReviewList}>수정</Link></span>
                </div> */}
                <form className="user_reivewlist_btn" onSubmit={HandleUserReviewListRemove}>
                    <button type="button" id="review_update_btn0" onClick={HandleMoveReviewUpdatePage} name="review_update">수정</button>
                    <button type="submit" id="review_delete_btn0" name="delete">삭제</button>
                </form>
            </div>
        </section>
    );
}
export default ReviewContent