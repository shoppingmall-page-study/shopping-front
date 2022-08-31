import { userGoodsDelete } from "../../Api/ApiService";
import "./userGoodsUp.css"

function GoodsUpContent({userGoodsup, setUserGoodsup, convertPrice}){

    const HandleUserProductUpdate = (e) => {
        e.preventDefault();
    }

    const HandleUserProductDelete = (e) => {
        e.preventDefault();
        userGoodsDelete(userGoodsup.productId)
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
                        <p id="user_product_count">수량 : {userGoodsup.total}</p>
                    </div>
                </div>
                <div className="user_product_event_form">
                    <form onSubmit={HandleUserProductUpdate}>
                        <button type="submit" className="user_productbtn">수정</button>
                    </form>
                    <form onSubmit={HandleUserProductDelete}>
                        <button type="submit" className="user_productbtn">삭제</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
export default GoodsUpContent