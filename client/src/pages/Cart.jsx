import React, { useContext } from 'react';
import { food_list } from '../assets/assets';
import { storeContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';


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
                <div className='text-center mt-[14rem]'>
                    <h2 className='text-4xl'>Your cart is empty </h2>
                    <p className='mt-2 text-xl'>Add some items to get started!</p>
                </div>
            ) : (
                <>
                    <div className="cart_lists mt-[6rem] flex justify-between">
                        <h2 className="flex-1">Items</h2>
                        <h2 className="flex-1">Title</h2>
                        <h2 className="flex-1">Price</h2>
                        <h2 className="flex-1">Quantity</h2>
                        <h2 className="flex-1">Total</h2>
                        <h2 className="flex-1">Remove</h2>
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
                                        <p className="flex-1 cursor-pointer" onClick={() => removeCart(item._id)}>X</p>
                                    </div>
                                    <hr className='mt-2' />
                                </div>
                            );
                        }
                        return null;
                    })}
                    <div className="totals flex flex-col md:flex-row justify-between items-center mt-[2rem]">
                        <div className="carts_total w-full md:w-[40%] mb-4 md:mb-0">
                            <h1 className='text-2xl'>Cart Total</h1>
                            <div className='flex justify-between mt-4'>
                                <p>Subtotal</p>
                                <p>₹ {getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className='flex justify-between'>
                                <p>Delivery Fee</p>
                                <p>₹ 20</p>
                            </div>
                            <hr />
                            <div className='flex justify-between'>
                                <p>Total</p>
                                <p>₹ {getTotalCartAmount() + 20}</p>
                            </div>
                            <button 
                                onClick={handleProceedToCheckout} 
                                className='btn bg-orange-600 p-2 text-white w-full mt-4'>
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                        <div className="promos p-2 w-full md:w-[40%]">
                            <p>If you have a promo code, enter it here:</p>
                            <input type="text" placeholder='Promo code' className='border p-2 w-full' />
                            <button className='bg-black p-2 text-white border-none w-full mt-2'>Submit</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
