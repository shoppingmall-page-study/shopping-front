import { userProductDelete } from "../../Api/ApiService";
import "./userGoodsUp.css"

function GoodsUpContent({userGoodsup, setUserGoodsup, convertPrice}){

    const HandleUserProductUpdate = (e) => {
        e.preventDefault();
    }
    const HandleUserProductDelete = (e) => {
        e.preventDefault();
        userProductDelete(userGoodsup.productId)
    }
    return(
        <section>
            <div  className="user_productlist_window">
                <div className="user_product_img">
                    <img id="user_productimg"src={userGoodsup.imgUrl} alt="product_img"/>
                </div>
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
                    <form onSubmit={HandleUserProductUpdate}>
                        <button className="user_productbtn">수정</button>
                    </form>
                    <form onSubmit={HandleUserProductDelete}>
                        <button className="user_productbtn">삭제</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
export default GoodsUpContent