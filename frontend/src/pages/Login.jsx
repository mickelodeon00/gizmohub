import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

import LoginIcon from '../assets/signin.gif';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section id="login">
      <div className=" container mx-auto p-2">
        <div className="bg-white mx-auto p-2 py-5 w-full max-w-md">
          <div className="w-20 h-20 mx-auto">
            <img src={LoginIcon} alt="Login Icon" />
          </div>
          <form>
            <div className="">
              <label>Email : </label>
              <div className="p-2 bg-slate-100 ">
                <input
                  type="text"
                  className="w-full outline-none bg-transparent"
                  placeholder="enter email"
                />
              </div>
            </div>
            <div className="">
              <label>password : </label>
              <div className="p-2 bg-slate-100 flex">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full outline-none bg-transparent"
                  placeholder="enter password"
                />
                <div
                  className=""
                  onClick={() => {
                    setShowPassword(!showPassword);
                    console.log(showPassword);
                  }}
                >
                  {showPassword ? (
                    <span className="text-2xl">
                      <FaEyeSlash />
                    </span>
                  ) : (
                    <span className="text-2xl">
                      <FaEye />
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Link
              to="/forgot-password"
              className="block w-fit ml-auto hover:underline hover:text-red-600"
            >
              forgot password?
            </Link>
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] mx-auto rounded-full hover:scale-110 hover:transition-all block"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
