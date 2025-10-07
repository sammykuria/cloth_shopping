// src/Components/CartIcon.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function getCartItemCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function CartIcon() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setItemCount(getCartItemCount());
  }, []);

  return (
    <Link to="/cart" className="cart-icon">
      🛒 Cart {itemCount > 0 && `(${itemCount})`}
    </Link>
  );
}