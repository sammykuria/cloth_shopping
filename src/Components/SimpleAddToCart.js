import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';


function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
}

export function SimpleAddToCart({ product }) {
  const [stock, setStock] = useState(product.stock_quantity || 0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  // Fetch current stock from database
  useEffect(() => {
    async function fetchStock() {
      try {
        const { data } = await supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', product.id)
          .single();
        
        if (data && data.stock_quantity !== null) {
          setStock(data.stock_quantity);
        }
      } catch (error) {
        console.error('Error fetching stock:', error);
      }
    }
    
    fetchStock();
  }, [product.id]);

  const handleClick = async () => {
    if (stock < 1) {
      alert('Sorry, this item is out of stock!');
      return;
    }

    // Check current cart quantity
    const cart = getCart();
    const cartItem = cart.find(item => item.id === product.id);
    const currentCartQuantity = cartItem ? cartItem.quantity : 0;

    // Check if adding would exceed available stock
    if (currentCartQuantity >= stock) {
      alert(`You already have all available stock in your cart! Only ${stock} items available.`);
      return;
    }

    setLoading(true);
    try {
      addToCart(product);
      alert(`${product.name} added to cart!`);
      navigate('/shopnow')
      // Update local stock state
      setStock(prev => prev - 1);
      
    } catch (error) {
      alert('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  // Show stock status
  const getStockStatus = () => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 5) return `Only ${stock} left!`;
    return 'In Stock';
  };

  return (
    <div className="add-to-cart-wrapper">
      <button 
        onClick={handleClick} 
        className="add-cart-btn"
        disabled={stock < 1 || loading}
      >
        {loading ? 'Adding...' : stock < 1 ? 'Out of Stock' : 'Add to Cart'}
      </button>
      <small className="stock-status">{getStockStatus()}</small>
    </div>
  );
}