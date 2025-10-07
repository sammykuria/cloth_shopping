// src/Components/Checkout.js
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { processOrder } from '../utils/Checkout';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // ✅ Get cartItems and user passed via navigate('/checkout', { state: { cartItems, user } })
  const { cartItems, user } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    location: '',
  });
  const [loading, setLoading] = useState(false);

  if (!cartItems || cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = async () => {
    if (!formData.name || !formData.location) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    const result = await processOrder(cartItems, user?.id);

    if (result.success) {
      alert(`Order #${result.orderId} placed successfully!`);
      
      // Optionally clear cart
      localStorage.removeItem('cart');

      // Navigate to receipt page
      navigate('/receipt', { state: { orderId: result.orderId, formData, cartItems } });
    } else {
      alert(`Checkout failed: ${result.error}`);
    }

    setLoading(false);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-form">
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
          />
        </label>

        <label>
          Location / Address:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your delivery location"
            required
          />
        </label>

        <button onClick={handleCheckout} disabled={loading}>
          {loading ? 'Processing...' : 'Complete Order'}
        </button>
      </div>
    </div>
  );
}
