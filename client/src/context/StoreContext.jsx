import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});

    const addToCart = (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({...prev, [itemId] :1}));
        } else {
            setCartItem((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
        }
    };

    const removeCart = (itemId) => {
        setCartItem((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount;
    };

    const contextValue = {
        food_list, cartItem, setCartItem, addToCart, removeCart, getTotalCartAmount
    };

    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    );
};

export default StoreContextProvider;
