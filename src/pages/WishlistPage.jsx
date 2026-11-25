
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import products from "../data/products";
import {
  selectWishIds,
  toggleWish,
  clearWish
} from "../store/wishlistSlice";

function WishlistPage() {
  const dispatch = useDispatch();
  const wishIds = useSelector(selectWishIds);

  const wishedProducts = products.filter((product) =>
    wishIds.includes(product.id)
  );

  return (
    <div className="home-page">
      <h1>My Wishlist</h1>

      {wishedProducts.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <>
          <button onClick={() => dispatch(clearWish())}>
            Clear Wishlist
          </button>

          <div className="product-list">
            {wishedProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />

                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <h3>Price: Rs. {product.price}</h3>

                <Link to={`/product/${product.id}`}>
                  View Product
                </Link>

                <button
                  onClick={() => dispatch(toggleWish(product.id))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WishlistPage;
