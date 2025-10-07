import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase} from './supabaseClient'


function AllProducts() {

    const [products, setProducts] = useState([])
    const [ role, setRole] = useState(null)
    const [ loading ,setLoading ] = useState(false)



    useEffect(() => {
        fetchProducts()
        // Get role from localstorage
        const userRole = localStorage.getItem("role")
        setRole(userRole)
    },[])

     async function fetchProducts() {
        setLoading(true)
        const { data, error } = await supabase.from('products').select('*')
        if (error) {
            console.log("Error fetching products:", error)
        } else {
            console.log("Fetched products:", data)
            setProducts(data)
        }
        setLoading(false)
    }



    // CREATE - Only for admin
    async function addProduct() {
        if (role !== "admin") return;
        
        const newProduct = {
            name: "New Product",
            price: 0,
            image_url: "default-image.jpg"
        }
        
        const { data, error } = await supabase.from("products").insert([newProduct]).select()
        if (error) {
            console.error("Error adding product:", error)
        } else {
            setProducts(prev => [...prev, ...data])
            fetchProducts() // Refresh the list
        }
    }



    // UPDATE - Only for admin
    async function updateProduct(id, updates) {
        if (role !== "admin") return;
        
        const { data, error } = await supabase
            .from("products")
            .update(updates)
            .eq("id", id)
            .select()
        
        if (error) {
            console.error("Error updating product:", error)
        } else {
            setProducts(prev => prev.map(product => 
                product.id === id ? { ...product, ...updates } : product
            ))
        }
        return data
    }



   // DELETE - Only for admin
    async function deleteProduct(id) {
        if (role !== "admin") return;
        
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id)
        
        if (error) {
            console.error("Error deleting product:", error)
        } else {
            setProducts(prev => prev.filter(product => product.id !== id))
        }
    }

       // Handle manual role refresh
    const refreshRole = () => {
        const userRole = localStorage.getItem("role")
        setRole(userRole)
        console.log("Current role:", userRole)
    }

    console.log(loading, addProduct, refreshRole)



  return (
    <div>
      <h2>Spend a milli just shopping</h2>

      <div className='wazingcontainer'>
        <ul>
            <li>
                <Link>
                <button>Men</button>
                </Link>
            </li>
             <li>
                <Link>
                <button>Women</button>
                </Link>
            </li>
             <li>
                <Link>
                <button>Bags</button>
                </Link>
            </li>
        </ul>

        <div>
            <input
            placeholder='Search Product'
            ></input>
        </div>
      </div>


        <div className='explainlater'>

            <div >
                <h2>BestSeller</h2>
                <p>Current Role: {role}</p>

                <div className='later'>
                 <div>
                    <input
                    placeholder='Search Product'
                    ></input>
                </div>

                <div className='checkbox'>

                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="checkChecked" />
                <label class="form-check-label" for="checkChecked">
                    Givenchy
                </label>
                </div>

                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="checkChecked" />
                <label class="form-check-label" for="checkChecked">
                    Givenchy
                </label>
                </div>

                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="checkChecked" />
                <label class="form-check-label" for="checkChecked">
                    Givenchy
                </label>
                </div>

                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="checkChecked" />
                <label class="form-check-label" for="checkChecked">
                    Givenchy
                </label>
                </div>

                </div>

                </div>
            </div>


                <div className='lovesongscontainer'>
                    {
                        products.map((product) => (
                            <div className='alusa' key={product.id}>
                                <Link to={`/details/${product.id}`}>
                                
                                <img className='kindeimg' src={product.image_url} alt='river' ></img>
                                <div className='producttext'>
                                    <h4>{product.name}</h4>
                                    <p>${product.price}</p>
                                </div>

                                   {role === "admin" && (
                            <div className="admin-buttons">
                            <button onClick={() => updateProduct(product.id, { price: 999 })}>
                                Edit
                            </button>
                            <button onClick={() => deleteProduct(product.id)}>Delete</button>
                            </div>
                        )}
                                 </Link>
                            </div>
                        ))
                    }
                </div>
        </div>


  {/* <div>
      <h1>Products</h1>
      {products.length > 0 ? (
        products.map((p) => (
          <div key={p.id}>
            <h2>{p.name}</h2>
            <p>${p.price}</p>
            {p.image_url && <img src={p.image_url} alt={p.name} width="150" />}
          </div>
        ))
      ) : (
        <p>No products yet...</p>
      )}
    </div> */}





    </div>
  )
}

export default AllProducts
