// src/Components/CartIcon.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function getCartItemCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function CartIcon({refreshTrigger}) {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setItemCount(getCartItemCount());
  }, [refreshTrigger]);

    useEffect(() => {
    // Listen for localStorage changes in other tabs
    const handleStorageChange = () => setItemCount(getCartItemCount());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


  return (
    <Link to="/cart" className="cart-icon">
      🛒 Cart {itemCount > 0 && `(${itemCount})`}
    </Link>
  );
}