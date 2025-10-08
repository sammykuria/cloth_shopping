import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export function SalesAnalytics() {
  const [salesData, setSalesData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchSalesData();
  }, []);

  async function fetchSalesData() {
  try {
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('name, sold_quantity, price')
      .order('sold_quantity', { ascending: false });

    if (productsError) console.error('Error fetching products:', productsError);

    // Compute total revenue from products table directly
    const total = Array.isArray(products)
      ? products.reduce(
          (sum, p) => sum + ((p.sold_quantity || 0) * (p.price || 0)),
          0
        )
      : 0;

    setSalesData(products || []);
    setTotalRevenue(total);
  } catch (err) {
    console.error('Unexpected error fetching sales data:', err);
  }
}


  return (
    <div className="sales-analytics">
      <h2>Sales Dashboard</h2>
      <div className="revenue-card">
        <h3>Total Revenue: ${totalRevenue.toFixed(2)}</h3>
      </div>
      
      <h3>Best Sellers</h3>
      {salesData.length === 0 ? (
        <p>No product data available.</p>
      ) : (
        salesData.map(product => (
          <div key={product.name} className="product-sales">
            <span>{product.name}</span>
            <span>Sold: {product.sold_quantity || 0}</span>
            <span>Revenue: ${((product.sold_quantity || 0) * product.price).toFixed(2)}</span>
          </div>
        ))
      )}
    </div>
  );
}
