
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/WishlistPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";

import Navbar from "./components/Navbar";

function NotFound() {
  return (
    <div className="home-page">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <h2>MiniShop</h2>
      <p>Your One Stop Online Shopping Store</p>
      <p>© 2026 MiniShop. All Rights Reserved.</p>
    </footer>
  );
}

function App() {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("minishop-theme") || "light";
  });

  const toggleTheme = () => {
    setTheme((previousTheme) =>
      previousTheme === "light" ? "dark" : "light"
    );
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("minishop-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/wishlist" element={<WishlistPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/product/:id"
          element={<ProductPage />}
        />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
