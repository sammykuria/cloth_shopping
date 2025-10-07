// src/Components/SimpleCart.js
import { useCart } from 'react-use-cart';

export function SimpleCart() {
  const { 
    items, 
    removeItem, 
    updateItemQuantity, 
    cartTotal, 
    emptyCart 
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to see them here!</p>
      </div>
    );
  }

  return (
    <div className="simple-cart">
      <h2>Shopping Cart ({items.length} items)</h2>
      
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image_url} alt={item.name} width="80" />
          
          <div className="item-info">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
          </div>

          <div className="quantity-controls">
            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
              +
            </button>
          </div>

          <div className="item-total">
            ${(item.price * item.quantity).toFixed(2)}
          </div>

          <button 
            onClick={() => removeItem(item.id)}
            className="remove-btn"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        <button onClick={emptyCart} className="clear-btn">
          Clear Cart
        </button>
        <button className="checkout-btn">
          Checkout
        </button>
      </div>
    </div>
  );
}