import "./review.css"
function Review({reviewlist, setReviewList}){
    return(
        <div className="review_window">
            <div className="review_title">
                <p>{reviewlist.title}</p>
            </div>
            <div className="review_see_line"></div>
            <div className="review_content">
                <p>{reviewlist.content}</p>
            </div>
        </div>
    );
}
export default Review;