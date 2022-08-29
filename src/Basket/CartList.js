import './Basket.css';

function CartList({cart, setCart, convertPrice}){
    return(
        <section className="cart_product_list">
        <input type="checkbox" />
        <div className="cart_product_wrap">
          <div className="cart_product_image">
            <img src={cart.imgUrl} alt="product-img" />
          </div>

          <div className="cart_product_info">          
            <p className="product_name">{cart.productName}</p>
            <p className="price">{convertPrice(cart.productPrice * cart.carttotal)}원</p>
            <p className="delivery">택배배송 / 무료배송</p>
          </div>
        </div>

        <div className="cart_product_count">
          <img
            className="minus"
            src="/images/icon-minus-line.svg"
            alt="minus"
          />

          <div className="count">
            <span>{cart.carttotal}</span>
          </div>
          <img
            className="plus"
            src="/images/icon-plus-line.svg"
            alt="plus"
          />
        </div>

        <div className="cart_product_price">
          <p className="total_price"></p>
          <button className="btn_submit">주문하기</button>
        </div>

        <div className="product_remove">
          <img src="/images/icon-delete.svg" alt="delete" />
        </div>
      </section>
    );
}

export default CartList;