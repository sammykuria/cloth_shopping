import { supabase } from './supabaseClient';

export async function updateProductStock(productId, newStock) {
  const { error } = await supabase
    .from('products')
    .update({ stock_quantity: newStock })
    .eq('id', productId);

  if (error) {
    console.error('Error updating stock:', error);
    alert('Failed to update stock');
  } else {
    alert('Stock updated successfully!');
  }
}
