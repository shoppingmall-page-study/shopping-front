import { useEffect, useState } from "react";
import { order } from "../../Api/ApiService";
import Hafter from "../../Header/HeaderAfter";
import UserMenuBar from "../userMenuBar";
import OrderListContent from "./orderListContent";

function OrderList({convertPrice,cart}){
    const [list,setList] = useState([])

    useEffect(() => {
       order().then((res) => {
        setList(res.data.data)
       }) 
    },[])

    console.log(list)

    return(
        <div>
            <div className="Header">
                <Hafter cart={cart}/>
                <p id="userGoodsup_title">주문목록</p>
            </div>
            <div className="Content">
                <div className="flex_userGooudsupContent">
                    <UserMenuBar/>
                    <div className="user_goodsup_window">
                    {list.length === 0 ? (
                        <div className="not_userGoodsup">
                            <p>사용자가 주문한 상품이 존재하지 않습니다.</p>
                        </div>
                    ) : 
                    list.map((list) => {
                        return <OrderListContent key={`orderkey-${list.productId}`} list={list} convertPrice={convertPrice}/>
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OrderList;