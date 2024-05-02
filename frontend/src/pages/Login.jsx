import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

import LoginIcon from '../assets/signin.gif';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section id="login">
      <div className=" container mx-auto p-4">
        <div className="bg-white mx-auto p-6 w-full max-w-sm">
          <div className="w-20 h-20 mx-auto">
            <img src={LoginIcon} alt="Login Icon" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={submitHandler}>
            <div className="">
              <label>Email : </label>
              <div className="p-2 bg-slate-100 ">
                <input
                  type="text"
                  name="email"
                  className="w-full outline-none bg-transparent"
                  placeholder="enter email"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
            </div>
            <div className="">
              <label>password : </label>
              <div className="p-2 bg-slate-100 flex">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="w-full outline-none bg-transparent"
                  placeholder="enter password"
                  onChange={(e) => onChangeHandler(e)}
                />
                <div
                  className=""
                  onClick={() => {
                    setShowPassword(!showPassword);
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
              className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] mx-auto mt-7 rounded-full hover:scale-110 hover:transition-all hover:bg-red-700 block"
            >
              Login
            </button>
          </form>
          <p className="py-4">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className=" text-red-600 hover:underline hover:text-red-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
