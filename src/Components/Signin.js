import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { supabase} from './supabaseClient'
import { useNavigate } from 'react-router-dom'



function Signin() {

    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ message, setMessage] = useState("")
      const navigate = useNavigate();

        async function createProfileIfMissing(userId, userEmail) {
        try {
            // First, try to get the profile
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single();

            // If profile doesn't exist, create one
            if (error && error.code === 'PGRST116') {
                console.log('Profile not found, creating one...');
                
                const { error: insertError } = await supabase
                    .from('profiles')
                    .insert([
                        { 
                            id: userId, 
                            email: userEmail,
                            role: 'user' // default role
                        }
                    ]);

                if (insertError) {
                    console.error('Error creating profile:', insertError);
                    return 'user'; // default role
                }

                // Fetch the newly created profile
                const { data: newData } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', userId)
                    .single();

                return newData?.role || 'user';
            }

            if (error) {
                console.error('Error fetching role:', error);
                return 'user';
            }

            return data?.role || 'user';
        } catch (error) {
            console.error('Error in createProfileIfMissing:', error);
            return 'user';
        }
    }


    async function handleSignIn(e) {
        e.preventDefault()
        setMessage("Signing in...")
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) { 
            setMessage(error.message)
        } else {
            console.log("User signed in:", data.user); 
            
            // Wait for session to be established
            setTimeout(async () => {
                const role = await createProfileIfMissing(data.user.id, data.user.email)
                console.log("Final role:", role);

                // Store role in localStorage
                localStorage.setItem("role", role);
                setMessage("Signed in successfully!")
                
                if(role === "admin"){
                    navigate('/admin') 
                } else {
                    navigate('/')
                }
            }, 1000);
        }
    }



  return (
    <div>

     

        <div className='loginmanenoz'>

            <div class="container">
            <div class="heading">SignIn to your account</div>
            <form class="form"onSubmit={handleSignIn}>
               
                <div class="input-field">
                <input
                    required=""
                    autocomplete="off"
                    type="email"
                    name="email"
                     value={email}
                    id="email"
                 onChange={(e) => setEmail(e.target.value)}
                />
                <label for="email">Email</label>
                </div>
                <div class="input-field">
                <input
                    required=""
                    autocomplete="off"
                    type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    name="text"
                    id="password"
                />
                <label for="username">Password</label>
                </div>

                <div class="btn-container">
                   
                     <button type='submit' class="btn">
                    Submit
                    </button>
                  
                    <p>{message}</p>
               
                <div class="acc-text">
                    New here ?
                    <span>
                       <Link to='/signup'>Create Account</Link> 
                    </span>
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
