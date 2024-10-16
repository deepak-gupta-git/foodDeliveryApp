import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className="footer bg-slate-800 mt-[30px] " id='footer'>
        <div className="footer_details w-[90%] lg:w-[80%] m-auto flex flex-col lg:flex-row justify-between p-10 gap-10">
          <div className="explore w-full lg:w-[50%]">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-orange-600">explore</h1>
            <p className="mt-3 text-white text-sm md:text-base">
            Choose from a diverse menu featuring 
            a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your craving and elevate your dining experience, one meal at a time.
            </p>
          </div>

          <div className="company list-none text-white w-full lg:w-auto">
            <h1 className="text-xl md:text-3xl">Company</h1>
            <div className="lis mt-2 m-2">
                    
          <li>Home</li>
              <li>About</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </div>
          </div>
         
       

          <div className="getintouch text-white w-full lg:w-auto lg:text-left">
            <h1 className="text-xl md:text-3xl">Get in Touch</h1>
            <p className="mt-3">+91-9565816707</p>
            <p>contact@deepak.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
