import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { updateProductStock } from './Utils';
import { Link } from 'react-router-dom';
import { SalesAnalytics } from './SalesAnalytic';
import Profile from './Profile';


function AdminDash() {
    const [activeSection, setActiveSection] = useState('add-product')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image_url: '',
  })
  const navigate = useNavigate()
const checkUser = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      alert('Please sign in to access admin panel')
      navigate('/login')
      return
    }

    setUser(session.user)

    const storedRole = localStorage.getItem('role')
    let userRole = storedRole

    if (!storedRole || storedRole !== 'admin') {
      userRole = await getUserRole(session.user.id)
      setRole(userRole)
      localStorage.setItem('role', userRole)
    } else {
      setRole(storedRole)
    }

    if (userRole === 'admin') {
      await fetchProducts()
    } else {
      alert('Access denied. Admin only.')
      navigate('/')
    }
  }, [navigate]) // ✅ include navigate dependency

  useEffect(() => {
    checkUser()
  }, [checkUser]) // ✅ no warning now

  async function getUserRole(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching role:', error)
        return 'user' // Default role
      }

      return data?.role || 'user'
    } catch (error) {
      console.error('Error in getUserRole:', error)
      return 'user' // Default role
    }
  }

  async function fetchProducts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data)
    }
    setLoading(false)
  }

  // CREATE - Add new product
  async function handleAddProduct(e) {
    e.preventDefault()
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill in all required fields')
      return
    }

    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price)
    }

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()

    if (error) {
      console.error('Error adding product:', error)
      alert('Error adding product: ' + error.message)
    } else {
      setProducts(prev => [data[0], ...prev])
      setNewProduct({ name: '', price: '', image_url: '' })
      alert('Product added successfully!')
    }
  }

  // UPDATE - Edit product
  async function handleUpdateProduct(e) {
    e.preventDefault()
    if (!editingProduct.name || !editingProduct.price) {
      alert('Please fill in all required fields')
      return
    }

    const updates = {
      name: editingProduct.name,
      price: parseFloat(editingProduct.price),
      image_url: editingProduct.image_url,
    }

    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', editingProduct.id)

    if (error) {
      console.error('Error updating product:', error)
      alert('Error updating product: ' + error.message)
    } else {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...p, ...updates } : p
      ))
      setEditingProduct(null)
      alert('Product updated successfully!')
    }
  }

  // DELETE - Remove product
  async function handleDeleteProduct(id) {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting product:', error)
      alert('Error deleting product: ' + error.message)
    } else {
      setProducts(prev => prev.filter(p => p.id !== id))
      alert('Product deleted successfully!')
    }
  }

  // Start editing a product
  function startEdit(product) {
    setEditingProduct({ ...product })
  }

  // Cancel editing
  function cancelEdit() {
    setEditingProduct(null)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (role !== 'admin') {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You need admin privileges to access this page.</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your products here</p>
        <p><strong>Logged in as:</strong> {user?.email} | <strong>Role:</strong> {role}</p>
      </div>

      <div className='adminprofile'>
        <ul>
         {user && (
          <button onClick={() => setActiveSection('profile')}>
            View Profile
          </button>
        )}

           <li>
            <Link to='/admin'>
            <button onClick={() => setActiveSection('admin')}>Add Product</button>
            </Link>
          </li>

           <li>
            <Link to='/salesanalytic'>
            <button onClick={() => setActiveSection('salesanalytic')}>Sales Analytics</button>
            </Link>
          </li>
        </ul>
      </div>

     <div className="admin-content">
  {activeSection === 'profile' && (
    <Profile
      user={user}
      role={role}
      setActiveSection={setActiveSection}
    />
  )}
</div>


      
      <div className="add-product-form">
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Price"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image_url}
              onChange={(e) => setNewProduct(prev => ({ ...prev, image_url: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>




      {/* Edit Product Form (shown when editing) */}
      {editingProduct && (
        <div className="edit-product-form">
          <h2>Edit Product</h2>
          <form onSubmit={handleUpdateProduct}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Product Name"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Price"
                step="0.01"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Image URL"
                value={editingProduct.image_url}
                onChange={(e) => setEditingProduct(prev => ({ ...prev, image_url: e.target.value }))}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-success">
                Update Product
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

     
      <div className="products-list">
        <h2>Manage Products ({products.length})</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="products-grid">


            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image_url} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                </div>


                 <div className="quantity-info">
              <p>Stock: {product.stock_quantity}</p>
              <p>Sold: {product.sold_quantity || 0}</p>
            </div>

                <div className="product-actions">


                   <div className="admin-controls">
                  <button onClick={() => updateProductStock(product.id, product.stock_quantity + 10)}>
                    +10 Stock
                  </button>

                  <button onClick={() => updateProductStock(product.id, product.stock_quantity - 1)}>
                    -1 Stock
                  </button>
                </div>


                  <button 
                    onClick={() => startEdit(product)}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>

                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>



                </div>
              </div>
            ))}
          </div>
        )}
      </div>

       {activeSection === 'sales-analytics' && (
          <div className="sales-analytics-section">
            <h2>Sales Analytics</h2>
            <SalesAnalytics />
          </div>
        )}
    </div>
  )
}

export default AdminDash