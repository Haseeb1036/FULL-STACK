
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  selectCartItems,
  selectCartTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} from "../store/cartSlice";

function CartPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <div className="home-page cart-page">
      <h1>My Shopping Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty!</h2>
          <p>Add some products to continue shopping.</p>
          <Link to="/" className="checkout-button">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="product-card cart-item" key={item.id}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="product-image"
                  />
                )}

                <h2>{item.title}</h2>
                <p>Price: Rs. {item.price}</p>

                <div className="quantity-controls">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>

                  <strong>{item.quantity}</strong>

                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>

                <h3>
                  Subtotal: Rs. {item.price * item.quantity}
                </h3>

                <button
                  className="remove-button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove Product
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <h3>Total Amount: Rs. {total}</h3>

            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout →
            </Link>

            <br />

            <button
              className="remove-button"
              onClick={() => dispatch(clearCart())}
            >
              Clear Entire Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
