import './order.css'

//해야 할일 css수정
function OrderListContent({list, convertPrice}){
    console.log(list)
    return(
        <section>
            <div  className="user_orderlist_window1">
                <div className="user_order_img">
                    <img id="as" src={list.products[0].imgUrl} alt="product_img"/>
                </div>
                <div className="user_order_list_view">
                    <div className="user_orderlist_title">
                        <p>{list.products[0].productName}</p>
                    </div>
                    <div className="user_orderlist_line"></div>
                    <div className="user_orderlist_content">
                        <div className='user_orderlist_detail_info'>
                        <p>가격 : {convertPrice(list.amount)}원</p>
                        <p>수량 : {list.products[0].productNum}</p>
                        </div>
                        <p id="order_status">주문상태 : {list.orderComplete}</p>
                        <p id="user_orderlist_orderTime">구매날짜 : {list.orderTime}</p>
                        {/* <div className="user_nickname_cal">
                            <span>{userGoodsup.userNickname}</span>
                            <span>등록일: {userGoodsup.createTime}</span>
                        </div> */}
                        {/* <p id="user_product_count">수량 : {iist.total}</p> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default OrderListContent