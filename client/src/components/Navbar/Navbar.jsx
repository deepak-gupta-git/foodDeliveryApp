import React from 'react'
import "./Navbar.css"
import {assets} from "../../assets/assets"
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../Store/authStore'
import { toast } from 'react-toastify'

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  const Onclick = async () => {
    toast.success("Logout succesfull");
  } 
  return (
 
        <div>
         <div className="nav fixed z-50">
          <label htmlFor="check" className='checkbtn'>&#9776;</label>
          <input type="checkbox"  id='check'/>
          <div className='logo_sections'>
            <NavLink to="/">  <label className='logo cursor-pointer'>explore</label></NavLink>
          </div>
          <ul>
            <NavLink to="/"><li>home</li></NavLink>
            <a href="#explore"><li>menu</li></a>
            <a href="#food_display"><li>explore-food</li></a>
            <a href="#footer"><li>contact us</li></a>
          </ul>

          <div className='searchBar'> 
          <div class="navbar-nav nav-search ms-auto">

          <div className="icons">
          <img src={assets.search_icon} alt="" />
           <NavLink to="/cart"> <img src={assets.basket_icon} alt="" /></NavLink>

           {
            isLoggedIn ? (
                  <NavLink to="/logout"><button onClick={Onclick} class="btn btn-search form-btn" type="submit">Logout</button></NavLink>
            ) : (
                 <NavLink to="/signup"><button class="btn btn-search form-btn" type="submit">sign up</button></NavLink>
            )
           }
         
          </div>

      </div>
          </div>

        </div>
    </div>

  )
}

export default Navbar
