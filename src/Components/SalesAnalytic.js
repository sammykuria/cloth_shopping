import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';


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
  <div className="nico">
    <Link to='/admin'>
      <i className="fa-solid fa-arrow-left"></i>
    </Link>
    <h4>Sales Dashboard</h4>
  </div>

  <div className="revenue-card">
    <h3>Total Revenue: ${totalRevenue.toFixed(2)}</h3>
  </div>

  <h3>Best Sellers</h3>
  {salesData.length === 0 ? (
    <p>No product data available.</p>
  ) : (
    <table className="sales-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Sold Quantity</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {salesData.map(product => (
          <tr key={product.name}>
            <td>{product.name}</td>
            <td>{product.sold_quantity || 0}</td>
            <td>${((product.sold_quantity || 0) * product.price).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

  );
}
