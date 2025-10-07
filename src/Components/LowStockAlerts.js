// components/LowStockAlerts.js
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { updateProductStock } from './Utils';


export function LowStockAlerts() {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    fetchLowStock();
  }, []);

  async function fetchLowStock() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .lt('stock_quantity', 10) // Products with less than 10 in stock
      .order('stock_quantity', { ascending: true });

    setLowStockProducts(data || []);
  }

  return (
    <div className="low-stock-alerts">
      <h3>Low Stock Alerts</h3>
      {lowStockProducts.map(product => (
        <div key={product.id} className="alert-item">
          <span>{product.name} - Only {product.stock_quantity} left!</span>
          <button onClick={() => updateProductStock(product.id, product.stock_quantity + 20)}>
            Restock +20
          </button>
        </div>
      ))}
    </div>
  );
}