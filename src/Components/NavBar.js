import React from 'react'
import { Link } from 'react-router-dom'
import { CartIcon} from './CartIcon'



function NavBar({user,handleLogout}) {



  return (
    <div className='navcont'>

        <div className='header'>
            <h2>JUPTA</h2>
        </div>


        <div className='cataloguecontainer'>
            <ul>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                    <li>
                    <Link to='/shopnow'>Shopping</Link>
                </li>
                    <li>
                    <Link>Contact</Link>
                </li>
            </ul>

        </div>

        <div className='Accart'>
        <ul>
            <li>
            {user ? (
               <p className="user-short"> 👤 {user.email.slice(0, 3)}</p> // shows email if logged in
            ) : (
                <Link to="/auth">Sign In</Link>
            )}
            </li>

            <li>
            <p>{<CartIcon />}</p>
            
              {/* 🛒 ({totalItems}) */}
            </li>

            {user && (
            <li>
                <button onClick={handleLogout}>Logout</button>
            </li>
            )}
        </ul>
        </div>

      
    </div>
  )
}

export default NavBar
