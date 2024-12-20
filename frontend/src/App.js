import { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import useCheckToken from './hooks/useCheckToken';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Products } from "./pages/Products"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Cart } from "./pages/Cart"
import { useDispatch } from "react-redux";
import { setLoggedIn, setToken } from './store/slices/globalSlice';
import { API_URL } from './constants';
import { recomputeCart } from './store/slices/cartSlice';
import Orders from './pages/Orders';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storageToken, setStorageToken] = useState();
  const dispatch = useDispatch();

  useCheckToken(setStorageToken, setIsLoggedIn);

  if (isLoggedIn) {
      dispatch(setLoggedIn(true));
      dispatch(setToken(storageToken));

      fetch(`${API_URL}/cart`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${storageToken}`
          }
        })
        .then((res) => res.json())
        .then((res) => {
          dispatch(recomputeCart(res.data.cartLines))
        })
      }

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
            <Route path='/login' element={<Login />}  />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Products />} />
            <Route path='/products' element={<Products />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<Orders />}/>
        </Routes>
      </Router>
    </div>
  
  )
}

export default App;
