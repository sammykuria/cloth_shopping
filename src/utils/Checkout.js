// src/utils/checkout.js
import { supabase } from '../Components/supabaseClient';

export async function processOrder(cartItems, userId = null) {
  try {
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // For now, just simulate order processing
    const orderId = 'ORD' + Date.now();
    
    // Update product quantities in database
    for (const item of cartItems) {
      const { data: product } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id', item.id)
        .single();

      if (product) {
        await supabase
          .from('products')
          .update({
            stock_quantity: product.stock_quantity - item.quantity
          })
          .eq('id', item.id);
      }
    }

    // Clear cart
    localStorage.removeItem('cart');
    
    return { success: true, orderId, totalAmount };
    
  } catch (error) {
    console.error('Checkout error:', error);
    return { success: false, error: error.message };
  }
}