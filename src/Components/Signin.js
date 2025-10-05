import React from 'react'
import { Link } from 'react-router-dom'
function Signin() {
  return (
    <div>

     

        <div className='loginmanenoz'>

            <div class="container">
            <div class="heading">SignIn to your account</div>
            <form class="form" action="">
                <div class="input-field">
                <input
                    required=""
                    autocomplete="off"
                    type="text"
                    name="text"
                    id="username"
                />
                <label for="username">Full Name</label>
                </div>
                <div class="input-field">
                <input
                    required=""
                    autocomplete="off"
                    type="email"
                    name="email"
                    id="email"
                />
                <label for="email">Email</label>
                </div>
                <div class="input-field">
                <input
                    required=""
                    autocomplete="off"
                    type="password"
                    name="text"
                    id="password"
                />
                <label for="username">Password</label>
                </div>

                <div class="btn-container">
                    <Link to='/'>
                     <button class="btn">
                    Submit
                    </button>
                    </Link>
               
                <div class="acc-text">
                    New here ?
                    <span >Create Account</span>
                </div>
                </div>
            </form>
         </div>

         <div className='noweakness'>
            <img src='./lalavi.jpeg' alt='mambombotela'></img>
         </div>

         </div>


      

        

        </div>
 
  )
}

export default Signin
