import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const [userData,setUserData] = useState({})

const submitHandler =(e)=>{
    e.preventDefault();
    setUserData({
        email:email,
        password:password
    })

    console.log(userData);

    setEmail('')
    setPassword('')
}

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
      <img
        className="w-16 mb-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Logo"
      />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} action="">
        <h3 className="text-lg mb-2 font-medium">What's your Email</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          required
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          type="email"
          placeholder="emailexample@gmail.com"
        />

        <h3 className="text-lg mb-2 font-medium">Enter Password</h3>

        <input
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          required
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          type="password"
          placeholder="password"
        />

        <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
          Login
        </button>
      </form>
      
      <p className="text-center">New Here?<Link to='/Signup'  className="text-blue-600">Create new Account</Link></p>
      </div>

      <div>
        <Link to={'/Captain-Signup'} className="bg-[#c47373] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as Captain</Link>
      </div>
    </div>
  );
};

export default UserLogin;
