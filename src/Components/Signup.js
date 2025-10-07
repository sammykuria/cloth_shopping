import React from 'react'
import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from 'react-router-dom';

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  

  async function handleSignUp(e) {
    e.preventDefault();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        setMessage(error.message)
    } else {
        // Create profile after successful signup
        if (data.user) {
            await createProfile(data.user)
            navigate('/login') 
        }
    }
}

async function createProfile(user) {
    const { error } = await supabase
        .from('profiles')
        .insert([
            { 
                id: user.id, 
                email: user.email,
                role: 'user' // default role
            }
        ])

    if (error) {
        console.error('Error creating profile:', error)
    }
}



  return (
    <div>
      
      <h2>This is the Sign up</h2>

         <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>

    </div>
  )
}

export default Signup
