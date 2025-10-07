// src/Components/SimpleAddToCart.js
// src/Components/SimpleAddToCart.js
import { useCart } from 'react-use-cart'; // If using react-use-cart

export function SimpleAddToCart({ product }) {
  const { addItem } = useCart();

  const handleClick = () => {
    addItem(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <button onClick={handleClick} className="add-cart-btn">
      Add to Cart
    </button>
  );
}