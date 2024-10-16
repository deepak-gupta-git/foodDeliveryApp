import React, { useContext } from 'react';
import { food_list } from '../assets/assets';
import { storeContext } from '../context/StoreContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItem, addToCart, removeCart, getTotalCartAmount } = useContext(storeContext);
    const navigate = useNavigate(); // Use navigate from react-router

    const isCartEmpty = Object.keys(cartItem).length === 0 || Object.values(cartItem).every(item => item === 0);

    const handleProceedToCheckout = () => {
        const orderItems = food_list.filter(item => cartItem[item._id] > 0).map(item => ({
            ...item,
            quantity: cartItem[item._id],
        }));
        // Navigate to order page with state
        navigate('/order', { state: { items: orderItems, totalAmount: getTotalCartAmount() + 20 } });
    };

    return (
        <div className='w-[80%] m-auto'>
            {isCartEmpty ? (
                <div className='text-center mt-[16rem]'>
                    <h2 className='text-5xl'>You do not order Anything</h2>
                    <p className='mt-2 text-xl'>Order some items to get started!</p>
                </div>
            ) : (
                <>
                <h1 className='mt-[6rem] text-4xl'>Your Orders</h1>
                    <div className="cart_lists mt-[6rem] flex justify-between">
                        <h2 className="flex-1">Items</h2>
                        <h2 className="flex-1">Title</h2>
                        <h2 className="flex-1">Price</h2>
                        <h2 className="flex-1">Quantity</h2>
                        <h2 className="flex-1">Total</h2>
                        <h2 className="flex-1">Orders</h2>
                    </div>
                    <hr className='mt-4' />
                    {food_list.map((item) => {
                        if (cartItem[item._id] > 0) {
                            return (
                                <div key={item._id}>
                                    <div className='cart_lists flex justify-between items-center mt-4'>
                                        <div className="flex-1">
                                            <img className='h-[30px] md:h-[50px]' src={item.image} alt={item.name} />
                                        </div>
                                        <p className="flex-1 text-sm sm:text-lg">{item.name}</p>
                                        <p className="flex-1">₹{item.price}</p>
                                        <p className="flex-1">{cartItem[item._id]}</p>
                                        <p className="flex-1">₹{item.price * cartItem[item._id]}</p>
                                        <p className="flex-1 cursor-pointer bg-orange-500 rounded-md p-2">Track Order</p>
                                    </div>
                                    <hr className='mt-2' />
                                </div>
                            );
                        }
                        return null;
                    })}
               
                </>
            )}
        </div>
    );
};

export default Cart;
