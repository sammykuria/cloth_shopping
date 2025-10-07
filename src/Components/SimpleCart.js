// src/Components/SimpleCart.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { processOrder } from '../utils/Checkout';
import { useNavigate } from 'react-router-dom';

// Simple cart functions
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function SimpleCart({user}) {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [navigate] = useNavigate()

  useEffect(() => {
    setCartItems(getCart());
  }, []);

    const handleCheckout = async () => {
    setCheckoutLoading(true);
    
    const result = await processOrder(cartItems, user?.id); // user from your auth
    
    if (result.success) {
      alert(`Order #${result.orderId} placed successfully!`);
      setCartItems([]);
      navigate('/checkout', { state: { orderId: result.orderId } });
    } else {
      alert(`Checkout failed: ${result.error}`);
    }
    
    setCheckoutLoading(false);
  };


  const removeFromCart = (productId) => {
    const newCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    const newCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to see them here!</p>
        <button>
          <Link to='/shopnow'>Buy Now</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="simple-cart">
      <h2>Shopping Cart ({cartItems.length} items)</h2>
      
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image_url} alt={item.name} width="80" />
          
          <div className="item-info">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
          </div>

          <div className="quantity-controls">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
          </div>

          <div className="item-total">
            ${(item.price * item.quantity).toFixed(2)}
          </div>

          <button 
            onClick={() => removeFromCart(item.id)}
            className="remove-btn"
          >
            Remove
          </button>
        </div>
      ))}

       <div className="cart-total">
        <h3>Total: ${getCartTotal().toFixed(2)}</h3>
        <button
          onClick={() => navigate('/checkout', { state: { cartItems, user } })}
          className="checkout-btn"
        >
          Proceed to Checkout
        </button>

      </div>
    </div>
  );
}