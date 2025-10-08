import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './Components/supabaseClient';
import Home from './Components/Home';
import Signin from './Components/Signin';
import NavBar from './Components/NavBar';
import AllProducts from './Components/AllProducts';
import AdminDash from './Components/AdminDash';
import Auth from './Components/Auth';
import ProductDetail from './Components/ProductDetail';
import Checkout from './Components/Checkout';
import About from './Components/About';
import {SimpleCart} from './Components/SimpleCart';
import { LowStockAlerts } from './Components/LowStockAlerts';
import { SalesAnalytics } from './Components/SalesAnalytic';
import Receipt from './Components/Receipt';
// import {CartProvider} from 'react-use-cart'
import { useNavigate } from 'react-router-dom';
import Profile from './Components/Profile';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current session on load
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    // Subscribe to login/logout changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);

      // Optional: Redirect on logout
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('cart');
        navigate('/');
      }
    });

    // Cleanup listener when component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('cart');
    navigate('/');
  }


  return (
    <div className="App">
    <NavBar user={user} handleLogout={handleLogout} />
   
    <Routes>
      <Route path='/' element={<Home user={user} />} />
       <Route path='/login' element={<Signin />} />
         <Route path='/admin' element={<AdminDash />} />
          <Route path='/profile' element={<Profile />} />
       <Route path='/auth' element={<Auth />} />
       <Route path='/about' element={<About />} />
        <Route path='/shopnow' element={<AllProducts user={user} />} />
        <Route path='/details/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<SimpleCart user={user} />} />
        <Route path='/lowstockalert' element={<LowStockAlerts />} />
         <Route path='/salesanalytic' element={<SalesAnalytics />} />
         <Route path='/checkout' element={<Checkout />} />
    <Route path='/receipt' element={<Receipt />} />
    </Routes>

    </div>
  );
}

export default App;
