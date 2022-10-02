import { userGoodsupGet } from "../../Api/ApiService";
import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
import Hafter from '../../Header/HeaderAfter';
import UserMenuBar from "../userMenuBar";
import GoodsUpContent from "./goodsUpContent"
import "./userGoodsUp.css"

function UserGoodsUp({convertPrice, productSelect, setProductSelect, cart}){
    const [userGoodsup, setUserGoodsup] = useState([])    //사용자가 단 등록한 상품들이 저장될 Hooks
    // const {id} = useParams();
    // const addressState = window.location.pathname
    useEffect(() => {
        userGoodsupGet().then((res) => {
            setUserGoodsup(res.data.data)
        })
        console.log("등록한 상품 목록 가져오기")
    },[])
    console.log(userGoodsup)
    return(
        <div>
            <div className="Header">
                <Hafter cart={cart}/>
                <p id="userGoodsup_title">올린 상품 명</p>
            </div>
            <div className="Content">
                <div className="flex_userGooudsupContent">
                    <UserMenuBar/>
                    <div className="user_goodsup_window">
                    {userGoodsup.length === 0 ?(
                        <div className="not_userGoodsup">
                            <p>사용자가 등록한 상품이 존재하지 않습니다.</p>
                        </div>
                    ): userGoodsup.map((userGoodsup) => {
                        return <GoodsUpContent key={`userGoodsupkey-${userGoodsup.productId}`} userGoodsup={userGoodsup} setUserGoodsup={setUserGoodsup} convertPrice={convertPrice} productSelect={productSelect} setProductSelect={setProductSelect}/> 
                    })
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserGoodsUp;