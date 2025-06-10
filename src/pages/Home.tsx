import { useContext } from "react";
import { CurrencyContext } from "../App";

export default function Home() {
  const { formatPrice } = useContext(CurrencyContext);

  // ... other code, e.g., fetching products, etc.

  return (
    <div>
      {/* ... other UI code ... */}
      <div className="product-list">
        {/* Assuming products is an array of product objects */}
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>{formatPrice(product.price)}</p>
              <button className="add-to-cart-btn">
                <img src="/26324020-panier-icône-isolé-sur-fond-blanc.jpg" alt="Add to cart" className="w-6 h-6 object-contain" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* ... other UI code ... */}
    </div>
  );
}
