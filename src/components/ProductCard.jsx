
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleWish, selectWishIds } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const wishIds = useSelector(selectWishIds);
  const isWished = wishIds.includes(product.id);

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  return (
    <div className="product-card">
      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      )}

      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <p>Category: {product.category}</p>

      <h3>Price: Rs. {product.price}</h3>

      <Link to={`/product/${product.id}`}>
        <button>View Product</button>
      </Link>

      <button onClick={() => dispatch(toggleWish(product.id))}>
        {isWished ? "Wished" : "Wish"}
      </button>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
