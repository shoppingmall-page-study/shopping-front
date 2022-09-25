//해야 할일 css수정
function OrderListContent({iist, convertPrice}){
    return(
        <section>
            <div  className="user_productlist_window">
                <div className="user_product_img">
                    <img id="user_productimg"src={iist.imgUrl} alt="product_img"/>
                </div>
                <div className="user_product_info">
                    <div className="user_productlist_title">
                        <p>{iist.name}</p>
                    </div>
                    <div className="user_productlist_content">
                        <p>가격 : {iist.amount}원</p>
                        {/* <div className="user_nickname_cal">
                            <span>{userGoodsup.userNickname}</span>
                            <span>등록일: {userGoodsup.createTime}</span>
                        </div> */}
                        <p id="user_product_count">수량 : {iist.total}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default OrderListContent