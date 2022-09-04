import { cartGet } from '../Api/ApiService';
import './Basket.css';

function CartHeader({cart, checkedList, setCheckedList}){

  // const ChangeElement = (checked) => {
  //   if(checked){
  //     setCheckedState("On")
  //     cartGet().then((res) => {
  //       setCheckedList(res.data.data)
  //     })
  //   }else{
  //     setCheckedState("Off")
  //     setCheckedList([])
  //   }
  // }
  const handleAllCheck = (checked) => {
    if(checked){
      setCheckedList(cart)
    }else{
      setCheckedList([])
    }
  }

  return(
      <div className="cart_title_wrap">
        <div className="tab_title">
          <input type="checkbox" onChange={(e) => handleAllCheck(e.target.checked)}
          checked={checkedList.length === cart.length && checkedList.length !== 0 ? true : false}/>
          <span>상품정보</span>
          <span>수량</span>
          <span>상품금액</span>
          {/* <p>전체선택</p> */}
        </div>
    </div>
  );
}

export default CartHeader;