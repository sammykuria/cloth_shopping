// components/SalesAnalytics.js
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export function SalesAnalytics() {
  const [salesData, setSalesData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchSalesData();
  }, []);

  async function fetchSalesData() {
    // Get best selling products
    const { data: products } = await supabase
      .from('products')
      .select('name, sold_quantity, price')
      .order('sold_quantity', { ascending: false });

    // Get total revenue
    const { data: revenue } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('status', 'completed');

    const total = revenue.reduce((sum, order) => sum + order.total_amount, 0);
    
    setSalesData(products);
    setTotalRevenue(total);
  }

  return (
    <div className="sales-analytics">
      <h2>Sales Dashboard</h2>
      <div className="revenue-card">
        <h3>Total Revenue: ${totalRevenue.toFixed(2)}</h3>
      </div>
      
      <h3>Best Sellers</h3>
      {salesData.map(product => (
        <div key={product.name} className="product-sales">
          <span>{product.name}</span>
          <span>Sold: {product.sold_quantity || 0}</span>
          <span>Revenue: ${((product.sold_quantity || 0) * product.price).toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}