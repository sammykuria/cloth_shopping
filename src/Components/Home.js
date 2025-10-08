import React from 'react'
import { Link } from 'react-router-dom'

function Home({user}) {



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
                <p>King & Queen Style</p>
                
              </div>
            </div>

            <div className='cardcontainer'>
              <img className='jeseeimg' src='./lizard2.jpeg' alt='jamming'></img>
              <div className='jeseetext'>
                <p>Opium Style</p>
             
              </div>
            </div>

            <div className='cardcontainer'>
              <img className='jeseeimg' src='./lizard3.jpeg' alt='jamming'></img>
              <div className='jeseetext'>
                <p>Trap Nation</p>
              
              </div>
            </div>
             <div  id='tellme'>
              <h3 className='jeseetexty' >Discover a curated collection of luxury items from desinger bags,timeless sophistication,impeccable craftsmanship, and iconic styles - all in one place</h3>
              
              <div className="jeseetext">
                {user ? (
                  <Link to="/shopnow">
                    <button>Buy Now</button>
                  </Link>
                ) : (
                  <div>
                    <p>Please sign in to continue shopping.</p>
                    <Link to="/auth">
                      <button>Sign In</button>
                    </Link>
                    <p>
                      Don’t have an account?{" "}
                      <Link to="/auth">
                        <span style={{ textDecoration: "underline", color: "#007bff" }}>Sign Up</span>
                      </Link>
                    </p>
                  </div>
                )}
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
