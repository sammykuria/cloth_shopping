import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='navcont'>

        <div className='header'>
            <h2>JUPTA</h2>
        </div>


        <div className='cataloguecontainer'>
            <ul>
                <li>
                    <Link>Catlogue</Link>
                </li>
                    <li>
                    <Link>Men</Link>
                </li>
                    <li>
                    <Link>Women</Link>
                </li>
            </ul>

        </div>

        <div className='Accart'>
            <ul>
                <li>
                   <p>Account</p>
                </li>

                <li>
                   <p>Cart</p>
                </li>
            </ul>
        </div>
      
    </div>
  )
}

export default NavBar
