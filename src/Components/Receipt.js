import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Receipt() {
    const location = useLocation()
     const { orderId, formData, cartItems } = location.state || {};

       if (!orderId) return <h2>No receipt found.</h2>;


  return (
    <div className="receipt-page">
      <h2>Order Receipt</h2>
      <p>Order ID: {orderId}</p>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Location: {formData.location}</p>

      <h3>Items:</h3>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} — {item.quantity} x ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Total: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h3>

      <Link to="/shopnow">Back to Shop</Link>
    </div>
  )
}
