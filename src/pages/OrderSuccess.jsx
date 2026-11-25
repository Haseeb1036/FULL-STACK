
import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="home-page">
        <h1>No Order Found!</h1>
        <Link to="/">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="home-page order-success">

      <div className="success-icon">✓</div>

      <h1>Order Placed Successfully!</h1>

      <p>Thank you for shopping with us.</p>

      <div className="cart-summary">

        <h2>Order Details</h2>

        <p><strong>Customer:</strong> {order.name}</p>

        <p><strong>Email:</strong> {order.email}</p>

        <p><strong>Phone:</strong> {order.phone}</p>

        <p><strong>Address:</strong> {order.address}</p>

        <p>
          <strong>Payment:</strong> {order.paymentMethod}
        </p>

        <hr />

        <h2>Products</h2>

        {order.items.map((item) => (
          <p key={item.id}>
            {item.title} × {item.quantity}
            <br />
            Rs. {item.price * item.quantity}
          </p>
        ))}

        <hr />

        <h2>Total Amount: Rs. {order.total}</h2>

      </div>

      <Link to="/" className="checkout-button">
        Continue Shopping
      </Link>

    </div>
  );
}

export default OrderSuccess;
