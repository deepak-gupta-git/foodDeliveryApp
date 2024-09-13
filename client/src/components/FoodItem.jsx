import React, { useContext} from 'react';
import { assets } from "../assets/assets";
import { storeContext } from '../context/storeContext';
import { useState } from 'react';

const FoodItem = ({ id, name, price, description, image }) => {

    const [itemCount, setItemCount] = useState(0)
    const {cartItem, addToCart, removeCart} = useContext(storeContext);

  return (
    <div className="food_item border p-4 rounded-lg shadow-md">
      <div className="food_item_img mb-4 relative">
        <img src={image} alt={name} className="object-cover rounded" />
        { !cartItem[id] 
        ?<img className='w-[40px] absolute cursor-pointer bottom-[20px] right-[45px] rounded-md' onClick={() =>addToCart(id)} src={assets.add_icon_white}/>
        :<div className=' absolute bottom-[20px] right-[45px] flex items-center rounded-3xl gap-3 bg-white'>
            <img onClick={() =>removeCart(id)} src={assets.remove_icon_red} alt="" />
           <p>{cartItem[id]}</p>
           <img onClick={() =>addToCart(id)} src={assets.add_icon_green} alt="" />
        </div>
        }
      </div>
      <div className="food_item_info">
        <div className="food_item_name_rating flex justify-between items-center mb-2">
          <p className="text-lg font-semibold">{name}</p>
          <img src={assets.rating_starts} alt="Rating" className=" h-5" />
        </div>
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        <p className="text-lg font-bold">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
