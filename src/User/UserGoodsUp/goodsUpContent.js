import { Link } from "react-router-dom";
import { userProductDelete } from "../../Api/ApiService";
import "./userGoodsUp.css"

function GoodsUpContent({userGoodsup, setUserGoodsup, convertPrice, productSelect, setProductSelect}){

    const HandleUserProductUpdate = () => {
        setProductSelect(userGoodsup)
    }
    const HandleUserProductDelete = (e) => {
        e.preventDefault();
        userProductDelete(userGoodsup.productId)
    }
    console.log(userGoodsup)
    return(
        <section>
            <div  className="user_productlist_window">
                <div className="user_product_img">
                    <img id="user_productimg"src={userGoodsup.imgUrl} alt="product_img"/>
                </div>
                <div className="product_info_text">
                    <div className="user_product_info">
                        <div className="user_productlist_title">
                            <p>{userGoodsup.name}</p>
                        </div>
                        <div className="user_productlist_content">
                            <p>가격 : {userGoodsup.price}원</p>
                            {/* <div className="user_nickname_cal">
                                <span>{userGoodsup.userNickname}</span>
                                <span>등록일: {userGoodsup.createTime}</span>
                            </div> */}
                            <p id="user_product_count">수량 : {userGoodsup.total}</p>
                        </div>
                    </div>
                    <div className="user_product_event_form">
                        <div className="user_goodsup_modify">
                            {/* <button className="user_productbtn">수정</button> */}
                            <Link to="/UserProducList/Modify" id="user_goodsup_modify_btn" onClick={HandleUserProductUpdate}>수정</Link>
                        </div>
                        <form onSubmit={HandleUserProductDelete}>
                            <button type="submit" className="user_productbtn">삭제</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default GoodsUpContent