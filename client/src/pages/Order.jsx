import React, { useContext } from "react";
import { storeContext } from "../context/StoreContext";
import { useAuth } from "../../Store/authStore";

const Cart = () => {
  const { isLoggedIn } = useAuth();
  const { getTotalCartAmount } = useContext(storeContext);


  const loginPay = async () => {
    toast.error("Making Payment You Have to Signup First");
  } 

  const ORDER = "https://food-delivery-app-tgyc.vercel.app/order"

  const paymentHandler = async (event) => {
    event.preventDefault();
  
    const amount = getTotalCartAmount() + 20;
    const currency = "INR";
    const receiptId = "1234567890";
  
    try {
      const response = await fetch(ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Razorpay requires amount in paise
          currency,
          receipt: receiptId,
        }),
      });
  
      const order = await response.json();
      console.log("order", order);
  
      const options = {
        key: "", // Razorpay key
        amount,
        currency,
        name: "User XYZ",
        description: "Test Transaction",
        image: "https://i.ibb.co/5Y3m33n/test.png",
        order_id: order.id, // Order ID from your backend
        handler: async function (response) {
          console.log(response);
         
            
            // Make sure to send cart data, user ID, and other order details
            // await fetch("http://localhost:2000/api/auth/myorder", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         orderId: order.id,
            //         items: cartItem, // Send cart items (if cartItem is available)
            //         totalAmount: amount,
            //         userId: userId, // Ensure you have the correct userId
            //     }),
            // });
        
           
        
        },
        prefill: {
          name: "Deepak Gupta",
          email: "deepak@example.com",
          contact: "9000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
  
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-[4rem]">
      <h1 className="text-3xl font-semibold text-center mb-8">Delivery Information</h1>

      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Cart Total</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between mb-2">
            <p>Delivery Fee</p>
            <p>₹20</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between mb-4">
            <p>Total</p>
            <p>₹{getTotalCartAmount() + 20}</p>
          </div>
          {
            isLoggedIn ? (
              <button
              onClick={paymentHandler}
              type="submit"
              className="btn bg-orange-600 p-2 text-white w-full mt-4 rounded-md hover:bg-orange-700"
            >
              PROCEED TO PAYMENT
            </button>

            ) : (
              <button
           onClick={loginPay}
             type="submit"
              className="btn bg-orange-600 p-2 text-white w-full mt-4 rounded-md hover:bg-orange-700"
            >
              PROCEED TO PAYMENT
            </button>
            )
          }
        
        </div>

        <form className="w-full md:w-1/2 flex flex-col gap-4 shadow-md rounded-md p-2">
      <label htmlFor="username">Name</label>
      <input placeholder='Enter Your Name' className='p-3 border rounded-md' 
        name="username"
        required 
        type="username"
        id='username'
        autoComplete='off'
        // value={user.username}
        // onChange={handleInput}
      
      
      />

      <label htmlFor="email">Address</label>
      <input type="text" placeholder='Enter your Address' className='p-3 border rounded-md'
       name="email"
       required 
       id='email'
       autoComplete='off'
      //  value={user.email}
      //  onChange={handleInput}
      />

      <label htmlFor="password">Area/Colony</label>
      <input placeholder='Lucknow, Gomatinagar' className='p-3 border rounded-md' 
       name="password"
       type="text" 
       required 
       id='password'
       autoComplete='off'
      //  value={user.password}
      //  onChange={handleInput}
      />

<label htmlFor="password">Mobile No</label>
      <input placeholder='+91-900000000' className='p-3 border rounded-md' 
       name="password"
       type="number" 
       required 
       id='password'
       autoComplete='off'
       />

      {/* <button className='btn border p-2 bg-orange-500'>sign up</button> */}
   
        </form>
      </div>
    </div>
  );
};

export default Cart;
