
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  selectCartItems,
  selectCartTotal,
  clearCart
} from "../store/cartSlice";

function CheckoutPage() {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s'-]{2,50}$/.test(name.trim())) {
      newErrors.name = "Enter a valid name (2-50 characters)";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())
    ) {
      newErrors.email = "Enter a valid email (example@gmail.com)";
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(phone.trim())) {
      newErrors.phone = "Enter a valid phone number (10-15 digits)";
    }

    // Address validation
    if (!address.trim()) {
      newErrors.address = "Delivery address is required";
    } else if (address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    // Payment validation
    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    // Terms validation
    if (!termsAccepted) {
      newErrors.terms = "Please accept Terms and Conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const order = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      paymentMethod,
      items: [...cartItems],
      total
    };

    dispatch(clearCart());

    navigate("/order-success", {
      state: { order }
    });
  };

  const updateField = (field, value, setter) => {
    setter(value);

    setErrors((previous) => ({
      ...previous,
      [field]: ""
    }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="home-page">
        <h1>Your Cart is Empty!</h1>
        <Link to="/">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="home-page checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        <form onSubmit={handleOrder} noValidate>

          <h2>Customer Details</h2>

          {/* Name */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              className={errors.name ? "input-error" : ""}
              onChange={(e) =>
                updateField("name", e.target.value, setName)
              }
            />
            {errors.name && (
              <small className="error-message">
                {errors.name}
              </small>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              className={errors.email ? "input-error" : ""}
              onChange={(e) =>
                updateField("email", e.target.value, setEmail)
              }
            />
            {errors.email && (
              <small className="error-message">
                {errors.email}
              </small>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              className={errors.phone ? "input-error" : ""}
              onChange={(e) =>
                updateField("phone", e.target.value, setPhone)
              }
            />
            {errors.phone && (
              <small className="error-message">
                {errors.phone}
              </small>
            )}
          </div>

          {/* Address */}
          <div className="form-group">
            <textarea
              placeholder="Delivery Address"
              value={address}
              className={errors.address ? "input-error" : ""}
              onChange={(e) =>
                updateField("address", e.target.value, setAddress)
              }
            />
            {errors.address && (
              <small className="error-message">
                {errors.address}
              </small>
            )}
          </div>

          {/* Payment */}
          <h2>Payment Method</h2>

          <div className="payment-options">

            <label>
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    paymentMethod: ""
                  }));
                }}
              />
              <strong>Cash on Delivery</strong>
              <p>Pay when your order arrives.</p>
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="Online Payment"
                checked={paymentMethod === "Online Payment"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    paymentMethod: ""
                  }));
                }}
              />
              <strong>Online Payment</strong>
              <p>Pay online for your order.</p>
            </label>

          </div>

          {errors.paymentMethod && (
            <small className="error-message">
              {errors.paymentMethod}
            </small>
          )}

          {/* Terms */}
          <h2>Terms and Conditions</h2>

          <label className="terms-label">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                setErrors((prev) => ({
                  ...prev,
                  terms: ""
                }));
              }}
            />
            I agree to the Terms and Conditions.
          </label>

          {errors.terms && (
            <small className="error-message">
              {errors.terms}
            </small>
          )}

          <button
            type="submit"
            className="checkout-button"
          >
            Place Order
          </button>

        </form>

        {/* Order Summary */}
        <div className="cart-summary">

          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <p key={item.id}>
              {item.title} × {item.quantity}
              <br />
              Rs. {item.price * item.quantity}
            </p>
          ))}

          <h2>Total: Rs. {total}</h2>

        </div>

      </div>

    </div>
  );
}

export default CheckoutPage;
