// src/Components/CartIcon.js
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';

export function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="cart-icon">
      🛒 Cart {totalItems > 0 && `(${totalItems})`}
    </Link>
  );
}