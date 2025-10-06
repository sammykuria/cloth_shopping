import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase} from './supabaseClient'


function AllProducts() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
    })

    async function fetchProducts() {
        const { data, error } = await supabase.from('products').select('*')
        if (error) {
            console.log(error)
        } else {
            setProducts(data)
        }
    }

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
                                <img className='kindeimg' src={product.image_url} alt='river' ></img>
                                <div className='producttext'>
                                    <h4>{product.name}</h4>
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
        </div>

{/* 
  <div>
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
