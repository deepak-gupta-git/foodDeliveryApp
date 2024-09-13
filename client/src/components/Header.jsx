import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className='mt-[6rem] w-[80%] md:w-[80%] m-auto h-[50vh] md:h-[34vw] relative ' id='header'>
      <div className="text absolute p-5 md:p-10 w-full md:w-[50%] bottom-4 md:bottom-12">
        <h1 className='text-3xl md:text-5xl text-white'>Order your favourite food here</h1>
        <p className='text-white mt-2 text-sm'>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one meal at a time.
        </p>
        <a href="#explore"><button className='btn border-2 p-2 rounded-3xl mt-3 text-white'>View Menu</button></a>
      </div>

      <img className='w-full h-full object-cover' src={assets.header_img} alt="header_img" />
    </div>
  )
}

export default Header;
