import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Signin from './Components/Signin';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />} />
       <Route path='/login' element={<Signin />} />
    </Routes>


    </div>
  );
}

export default App;
