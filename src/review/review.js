import { TextField } from "@material-ui/core";
import "./review.css"
function Review({reviewlist, setReviewList}){
    console.log(reviewlist)
    return(
        <>
        <div className="review_window">
            <div className="review_uploaded_img">
                <img src={reviewlist.imgUrl} id="review_uploaded_img_img" alt="sample"/>
            </div>
            <div className="reviw_content_title_content">
                {/* <div className="review_title">
                    <p>{reviewlist.title}</p>
                </div> */}
                <TextField 
                    disabled
                    id="review_see_looks_title"
                    variant="outlined"
                    fullWidth
                    defaultValue={reviewlist.title}
                    // InputProps={{
                    //     readOnly: true,
                    // }}
                    multiline
                    maxRows={2}
                />
                <div className="review_see_line"></div>
                <TextField
                    disabled
                    id="review_see_looks_content"
                    variant="outlined"
                    fullWidth
                    defaultValue={reviewlist.content}
                    multiline
                    maxRows={3}
                    // InputProps={{
                    //     readOnly: true,
                    // }}
                />
                {/* <div className="review_content">
                    <p>{reviewlist.content}</p>
            </div> */}
            </div>
        </div>
        <div className="under_lien"></div>
        </>
    );
}
export default Review;