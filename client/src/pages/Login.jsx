import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Store/authStore';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {storeTokenInLS} = useAuth();

  const LOGINURL = "https://fooddeliveryapp-2cmx.onrender.com"
  

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    console.log(user)
    e.preventDefault();
    try {
      const response = await fetch(LOGINURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if(response.ok) {
        // alert("user Successful");
        // storeTokenInLS(res_data.token);
        setUser({ email: "", password: "" });
        toast.success("Login successful");
        navigate("/");
        storeTokenInLS(res_data.token);
      } else {
        toast.error(
        "Invalid Email or Password"
        );

        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
       <div className='mt-[7rem] w-[60%] m-auto'>
      <form action="" className='flex justify-center flex-col gap-4' onSubmit={handleSubmit}>
      <h1 className='text-2xl md:text-4xl text-orange-500'>Hello From Login</h1>

      <label htmlFor="email">email</label>
      <input type="email" placeholder='enter your email' className='p-3 border rounded-md'
       name="email"
       required 
       id='email'
       autoComplete='off'
       value={user.email}
       onChange={handleInput}
      />

      <label htmlFor="password">password</label>
      <input type="password" placeholder='enter your password' className='p-3 border rounded-md' 
       name="password"
       required 
       id='password'
       autoComplete='off'
       value={user.password}
       onChange={handleInput}
      />

      <button className='btn border p-2 bg-orange-500'>login</button>
      </form>

      <div className="logings flex content-around p-4">
      <p >do not have account? </p> 
      <NavLink to="/signup" ><p className='underline'>signup</p></NavLink>
      </div>

    </div>
    </div>
  )
}

export default Login
