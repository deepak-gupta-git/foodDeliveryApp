import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import { Routes, Route} from "react-router-dom"
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Error from './pages/Error';
import Order from './pages/Order';
import {AuthProvider} from "../Store/authStore"
import { Logout } from './pages/Logout';
import FeedBack from './components/FeedBack';
import MyOrders from './components/MyOrders';

const App = () => {
  return (
  <>
  <AuthProvider>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/*' element={<Error/>}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/feedback' element={<FeedBack/>}/>
      <Route path='/myorders' element={<MyOrders/>}/>
    </Routes>
    <Footer/>
    </AuthProvider>
  </>
  )
};

export default App
