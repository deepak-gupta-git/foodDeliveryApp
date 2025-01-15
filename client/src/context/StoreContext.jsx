import { createContext, useState } from "react";
import { food_list as initialFoodList } from "../assets/assets";

export const storeContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState({});
    const [food_list] = useState(initialFoodList); // Food list remains static
    const [filterCategory, setFilterCategory] = useState(null); // For filtering categories

    // Function to set the selected category
    const setCategoryFilter = (category) => {
        setFilterCategory(category);
    };

    // Add item to cart
    const addToCart = (itemId) => {
        setCartItem((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1, // Increment item count or set to 1 if not in cart
        }));
    };

    // Remove item from cart
    const removeCart = (itemId) => {
        setCartItem((prev) => {
            if (prev[itemId] === 1) {
                const updatedCart = { ...prev };
                delete updatedCart[itemId]; // Remove the item if count is 1
                return updatedCart;
            }
            return { ...prev, [itemId]: prev[itemId] - 1 }; // Decrement count otherwise
        });
    };

    // Calculate total amount in cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItem) {
            const itemInfo = food_list.find((product) => product._id === itemId);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItem[itemId];
            }
        }
        return totalAmount;
    };

    // Context value to provide
    const contextValue = {
        food_list,
        cartItem,
        addToCart,
        removeCart,
        getTotalCartAmount,
        filterCategory,
        setCategoryFilter,
    };

    return (
        <storeContext.Provider value={contextValue}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreContextProvider;
