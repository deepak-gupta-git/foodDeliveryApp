import React, { useContext } from "react";
import { storeContext } from "../context/storeContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({category}) => {
  const { food_list } = useContext(storeContext);

  return (
    <div>
      <div className="food_display w-[80%] m-auto" id="food_display">
        <h2 className="text-3xl md:text-5xl">Top dishes near you</h2>
        <div className="food_list grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 mt-5">
          {food_list.map((item, index) => ( 
            
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
