import React, { useContext } from 'react'
import { menu_list } from '../assets/assets'
const Explore = ({category, setCategory}) => {

  return (
    <div className='w-[80%] sm:w-[80%] m-auto mt-[2rem]'  id='explore'>
      <h1 className='text-2xl sm:text-3xl lg:text-5xl mt-3'>Explore our menu</h1>
      <p className='mt-3 text-sm sm:text-base lg:text-lg'>Choose from a diverse menu featuring 
        a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your craving and elevate your dining experience, one meal at a time.</p>
      
      <div className="menu_list flex flex-wrap sm:flex-nowrap justify-center text-center gap-5 mt-3 overflow-x-auto">
        {
          menu_list.map((item, index) => {
            return (
              <div
              onClick={() =>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}
              key={index} className='w-[80px] sm:w-[110px] hover:scale-105 transition-transform duration-300'>
            
                <img  className={`cursor-pointer ${category === item.menu_name ? "active" : ""}`} src={item.menu_image} alt={item.menu_name} />
                <p className='text-sm sm:text-base'>{item.menu_name}</p>
              </div>
            )
          })
        }
      </div>

      <hr className='m-5 sm:m-10'/>
    </div>
  )
}

export default Explore
