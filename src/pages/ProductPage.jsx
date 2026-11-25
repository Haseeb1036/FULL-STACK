
import { useParams, Link } from "react-router-dom";
import products from "../data/products";

function ProductPage() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <div className="home-page">
      <h1>{product.title}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      )}

      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <h2>Price: Rs. {product.price}</h2>

      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default ProductPage;
