import './Basket.css';

function TotalCart({cart, setCart}){
    return(
        <div className="total">
        <div className="total_price">
          <p className="cart_product_total_price">총 상품금액</p>
          <p className="cart_product_price"></p>
        </div>
        <div className="pay_minus">
          <img src="/images/icon-minus-line.svg" alt="minus" />
        </div>
        <div className="sale">
          <p className="cart_product_sale">상품 할인</p>
          <p className="cart_product_sale_price">0원</p>
        </div>
        <div className="pay_plus">
          <img src="/images/icon-plus-line.svg" alt="plus" />
        </div>
        <div className="delivery">
          <p className="cart_product_delivery">배송비</p>
          <p className="cart_product_delivery_price">0원</p>
        </div>

        <div className="payment">
          <p className="cart_prouct_payment">결제 예정 금액</p>
          <p className="cart_prouct_payment_price">0</p>
        </div>
      </div>
    );
}

export default TotalCart;