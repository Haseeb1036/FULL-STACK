
import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">WELCOME TO MINI SHOP</span>
          <h1>
            Discover Your
            <br />
            <span>Favorite Products</span>
          </h1>
          <p>
            Explore quality products at amazing prices.
            Find everything you need in one place.
          </p>
          <a href="#products" className="hero-button">
            Explore Products →
          </a>
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading">
          <span className="section-tag">OUR COLLECTION</span>
          <h2>Explore Our Products</h2>
          <p>Find the perfect products for your needs.</p>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Web Development">Web Development</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-products">No products found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
