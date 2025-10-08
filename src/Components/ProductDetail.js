import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase} from './supabaseClient'
import { SimpleAddToCart } from './SimpleAddToCart';


function ProductDetail() {

     const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
 useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        
        // Use the same supabase client that works for your product list
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single(); // .single() returns the first record directly (not an array)

        if (error) {
          throw error;
        }

        setProductDetails(data);
        
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }




    if (id) {
      fetchProduct();
    }
  }, [id]);



  if (loading) {
    return <div>Loading product...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productDetails) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h2 className='navman'> Product Details</h2>


      <div className="product-details-container">
        <h2>{productDetails.title}</h2>
        <img src={productDetails.image_url} alt={productDetails.title} />
        <p>{productDetails.description}</p>
        <p><strong>${productDetails.price}</strong></p>
        <SimpleAddToCart product={productDetails} />
      </div>

     
    </div>
  )
}

export default ProductDetail
