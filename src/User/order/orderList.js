import { useEffect, useState } from "react";
import { order,userReviewGet } from "../../Api/ApiService";
import Hafter from "../../Header/HeaderAfter";
import UserMenuBar from "../userMenuBar";
import OrderListContent from "./orderListContent";
import "./order.css"

function OrderList({convertPrice,cart}){
    const [list,setList] = useState([])

    useEffect(() => {
        order().then((res) => {
        // console.log(res.data.data)
        // res.data.data.orderComplete === "complete"
        // if(res.data.data == "su")
        setList(res.data.data.filter((el) => el.orderComplete === "complete"))
        }) 
    },[])


    return(
        <div>
            <div className="Header">
                <Hafter cart={cart}/>
            </div>
            <div className="Content">
                <p id="userGoodsup_title">주문목록</p>
                <div className="flex_userGooudsupContent">
                    <div className="menubar_flex">
                        <UserMenuBar/>
                    </div>
                    <div className="order_list_wd">
                    <div className="user_orderlist_window">
                    {list.length === 0 ? (
                        <div className="not_userGoodsup">
                            <p>사용자가 주문한 상품이 존재하지 않습니다.</p>
                        </div>
                    ) : 
                    list.map((list) => {
                        return <OrderListContent key={`orderkey-${list.orderId}`} list={list} convertPrice={convertPrice}/>
                    })}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
export default OrderList;