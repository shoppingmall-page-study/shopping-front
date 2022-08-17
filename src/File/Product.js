import { Link } from "react-router-dom";
import './Product.css'

function Product({product, convertPrice}){
  return (
    <div className="product">
      <div className="product_img">
        <Link to={`/product/${product.productId}`}>
          {/* <img src={product.image} alt={product.id}/> */}
          <img src={product.imgUrl} alt={product.id}/>
        </Link>
      </div>
      <div className="store">
        {/* <span>{product.provider}</span> */}
        <span>{product.title}</span>
      </div>
      <div className="product_name">
        <span>{product.name}</span>
      </div>
      <div className="price_info">
        <span className="price">{convertPrice(product.price)}</span>
        <span className="unit">원</span>
      </div>
    </div>
  );
}
export default Product;
