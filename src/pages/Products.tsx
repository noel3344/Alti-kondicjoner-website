import { useContext } from "react";
import { CurrencyContext } from "../App";

export default function Products() {
  const { formatPrice } = useContext(CurrencyContext);

  // Example product list for demonstration
  const products = [
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
    { id: 3, name: "Product 3", price: 39.99 },
  ];

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="flex items-center space-x-4 mb-4">
            <span>{product.name}</span>
            <span>{formatPrice(product.price)}</span>
            <button className="ml-2">
              <img
                src="/26324020-panier-icône-isolé-sur-fond-blanc.jpg"
                alt="Add to cart"
                className="w-6 h-6 object-contain"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
