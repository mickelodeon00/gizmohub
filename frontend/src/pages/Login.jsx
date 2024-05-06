import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';

import { AppContext } from '../contexts/AppContext';
import LoginIcon from '../assets/signin.gif';
import { postRequest } from '../utils/apiCall';
import { getError } from '../utils/util';
import { LOGIN_URL } from '../utils/apiUrl';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: ctxDispatch } = useContext(AppContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: userInfo, token } = await postRequest({
        url: LOGIN_URL,
        data: payload,
      });
      setIsLoading(false);
      localStorage.setItem('token', token);
      ctxDispatch({ type: 'USER_SIGNIN', payload: userInfo });

      navigate('/');
      toast.success('Login successful');
    } catch (err) {
      toast.error(getError(err));
      setIsLoading(false);
    }
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
                  onChange={onChangeHandler}
                  required
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
                  onChange={onChangeHandler}
                  required
                />
                <div
                  className="text-2xl"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
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
              className="flex justify-center items-center gap-2 bg-red-600 text-white px-6 py-2 w-full max-w-[150px] mx-auto mt-7 rounded-full hover:scale-110 hover:transition-all hover:bg-red-700 disabled:bg-opacity-40"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="loading-icon text-red-600">
                  <AiOutlineLoading />
                </span>
              )}
              <span>Login</span>
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
