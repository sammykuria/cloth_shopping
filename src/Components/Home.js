import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flow-container'>

      <div className='first'>

         <div className='firstimage'>
            <img src='./mind.webp' alt='mambomob'></img>
        </div>
        
        <div className='firsttext'>
       <h2>COMFORT REDEFINED</h2>
        <p>FASHION REDESIGNED</p>

          <div>

          <div className='homecardcont'>


            <div className='cardcontainer'>
              <img className='jeseeimg' src='./lizard.png' alt='jamming'></img>
              <div className='jeseetext'>
                <p>Goyard Bag</p>
                <p>$ 123.00</p>
              </div>
            </div>

            <div className='cardcontainer'>
              <img className='jeseeimg' src='./lizard.png' alt='jamming'></img>
              <div className='jeseetext'>
                <p>Goyard Bag</p>
                <p>$ 123.00</p>
              </div>
            </div>

            <div className='cardcontainer'>
              <img className='jeseeimg' src='./lizard.png' alt='jamming'></img>
              <div className='jeseetext'>
                <p>Goyard Bag</p>
                <p>$ 123.00</p>
              </div>
            </div>
             <div  id='tellme'>
              <h3 className='jeseetexty' >Discover a curated collection of luxury items from desinger bags,timeless sophistication,impeccable craftsmanship, and iconic styles - all in one place</h3>
              <div className='jeseetext'>
                <Link to='/shopnow'>
                  <button>Buy Now</button>
                </Link>
              </div>
            </div>

          </div>

       


        </div>

       
    </div>   
      </div>
    </div>
  )
}

export default Home
