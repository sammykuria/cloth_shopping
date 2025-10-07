import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './Components/supabaseClient';
import Home from './Components/Home';
import Signin from './Components/Signin';
import NavBar from './Components/NavBar';
import AllProducts from './Components/AllProducts';
import Signup from './Components/Signup';
import AdminDash from './Components/AdminDash';
import ProductDetail from './Components/ProductDetail';
import SimpleCart from './Components/SimpleCart';
import {CartProvider} from 'react-use-cart'


function App() {
  const [ user, setUser ] = useState(null)

   useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
      
    );
    

    // get current user on first load
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }


  return (
    <div className="App">
    <NavBar user={user} handleLogout={handleLogout} />
   
    <Routes>
      <Route path='/' element={<Home />} />
       <Route path='/login' element={<Signin />} />
         <Route path='/admin' element={<AdminDash />} />
       <Route path='/signup' element={<Signup />} />
        <Route path='/shopnow' element={<AllProducts />} />
        <Route path='/details/:id' element={<ProductDetail />} />
        <Routes path='/cart' element={<SimpleCart />} />
    </Routes>

    </div>
  );
}

export default App;
