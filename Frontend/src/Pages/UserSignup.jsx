import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
    const [userData,setUserData] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const submitHandler =(e)=>{
        e.preventDefault();
        setUserData({
            FirstName:FirstName,
            LastName:LastName,
            Email:Email,
            Password:Password
        })
        console.log(userData);
        setFirstName('')
        setLastName('')
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
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          action=""
        >
          <h3 className="text-base mb-2 font-medium">What's your Name</h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              required
              value={FirstName}
            onChange={(e)=>{
            setFirstName(e.target.value)
          }}
              type="text"
              placeholder="First Name"
            />
            <input
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              required
              value={LastName}
          onChange={(e)=>{
            setLastName(e.target.value)
          }}
              type="text"
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-lg mb-2 font-medium">What's your Email</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            required
            value={Email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
            type="email"
            placeholder="emailexample@gmail.com"
          />

          <h3 className="text-base mb-2 font-medium">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            required
            value={Password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm">
            Login
          </button>
        </form>

        <p className="text-center">
          Already have a account?
          <Link to="/login" className="text-blue-600">
          Login here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] leading-tight">
          By proceeding , you consent to get calls,whatsApp or
          SMS,message,including by automated means,from uber and its affiliates
          to the number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
