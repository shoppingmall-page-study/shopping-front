import { Link, useNavigate } from "react-router-dom";
import { userProductDelete } from "../../Api/ApiService";
import "./userGoodsUp.css"

function GoodsUpContent({userGoodsup, setUserGoodsup, convertPrice, productSelect, setProductSelect, Goodsup}){
    const navigate = useNavigate()
    const HandleUserProductUpdate = () => {
        setProductSelect(Goodsup)
    }
    const HandleUserProductDelete = (e) => {
        e.preventDefault();
        userProductDelete(Goodsup.productId).then((response) => {
            if(response === undefined){
             alert("등록상품삭제에 실패하였습니다.")   
            }else{
            if(response.status === 200){
                console.log(userGoodsup)
                console.log(Goodsup)
                const found = userGoodsup
                alert(response.data.msg)
                setUserGoodsup(found.filter((el) => el.productId !== Goodsup.productId))
                navigate("/UserProducList")
            }else{
              alert(response.data.msg)
            }
          }})
    }
    // console.log(userGoodsup)
    const HandleMoveGoodsUpdatePage = () =>{
        setProductSelect(Goodsup)
        navigate("/UserProducList/Modify")
    }
    return(
        <section>
            <div  className="user_productlist_window">
                <div className="user_productlist_img">
                    <img id="user_productimg"src={Goodsup.imgUrl} alt="product_img"/>
                </div>
                {/* <div className="product_info_text"> */}
                    <div className="user_product_info">
                        <div className="user_productlist_title">
                            <p>{Goodsup.title}</p>
                        </div>
                        <div className="uer_productlist_line"></div>
                        <div className="user_productlist_content">
                            <div className="user_productlist_datail_info">
                            <p>가격 : {Goodsup.price}원</p>
                            {/* <div className="user_nickname_cal">
                                <span>{userGoodsup.userNickname}</span>
                                <span>등록일: {userGoodsup.createTime}</span>
                            </div> */}
                            <p id="user_product_count">수량 : {Goodsup.total}</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="user_product_event_form">
                        <form className="user_product_update_del_form" onSubmit={HandleUserProductDelete}>
                            <button type="button" onClick={HandleMoveGoodsUpdatePage}>수정</button>
                            <button type="submit" className="user_productbtn">삭제</button>
                        </form>
                    </div> */}
            </div>
            <div className="user_productlist_btn_from">
                <form className="user_product_update_del_form" onSubmit={HandleUserProductDelete}>
                    <button type="button" onClick={HandleMoveGoodsUpdatePage}>수정</button>
                    <button type="submit" className="user_productbtn">삭제</button>
                </form>
            </div>
        </section>
    );
}
export default GoodsUpContent