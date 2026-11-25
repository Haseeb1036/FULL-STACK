
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { selectWishIds } from "../store/wishlistSlice";
import { selectCartCount } from "../store/cartSlice";

function Navbar({ theme, toggleTheme }) {
  const wishIds = useSelector(selectWishIds);
  const cartCount = useSelector(selectCartCount);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">M</span>
        Mini<span>Shop</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>

        <a href="/#products" className="nav-link">
          Products
        </a>

        <a href="/#contact" className="nav-link">
          Contact
        </a>

        <NavLink to="/wishlist" className="nav-link">
          Wishlist <span className="wish-count">{wishIds.length}</span>
        </NavLink>

        <NavLink to="/cart" className="nav-link">
          🛒 Cart <span className="wish-count">{cartCount}</span>
        </NavLink>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Change website theme"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
