import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';

import { AppContext } from '../contexts/AppContext';
import LoginIcon from '../assets/signin.gif';
import { postRequest } from '../utils/apiCall';
import { SIGNUP_URL } from '../utils/apiUrl';
import { cloudUpload } from '../utils/cloudUpload';
import { getError } from '../utils/util';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [file, setFile] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: ctxDispatch } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [file]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (payload.confirmPassword !== payload.password) {
      return toast.error('password do not match');
    }

    setIsLoading(true);
    try {
      let imgUrl;
      if (file) {
        imgUrl = await cloudUpload(file, 'profile');
      }
      const { data: userInfo, token } = await postRequest({
        url: SIGNUP_URL,
        data: {
          ...payload,
          image: imgUrl ? imgUrl : '',
        },
      });
      setIsLoading(false);
      localStorage.setItem('token', token);
      ctxDispatch({ type: 'USER_SIGNIN', payload: userInfo });
      navigate('/');
      toast.success('Login successful');

      console.log('userInfo', userInfo);
    } catch (err) {
      setIsLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <section id="signup">
      <div className=" container mx-auto p-4">
        <div className="bg-white mx-auto p-6 w-full max-w-sm">
          <div className="w-20 h-20 mx-auto overflow-hidden rounded-full relative">
            <div className="">
              <img
                className="w-full "
                src={previewImage || LoginIcon}
                alt="Login Icon"
              />
            </div>
            <form>
              <label className="">
                <div className="w-full text-center text-xs bg-slate-200 pt-2 pb-4 absolute bottom-0 bg-opacity-70 cursor-pointer">
                  upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={submitHandler}>
            <div className="">
              <label>Name : </label>
              <div className="p-2 bg-slate-100 ">
                <input
                  type="text"
                  name="name"
                  className="w-full outline-none bg-transparent"
                  placeholder="enter your name"
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>
            <div className="">
              <label>Email : </label>
              <div className="p-2 bg-slate-100 ">
                <input
                  type="email"
                  name="email"
                  className="w-full outline-none bg-transparent"
                  placeholder="enter email"
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>
            <div className="">
              <label>Password : </label>
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
            <div className="">
              <label>Confirm Password : </label>
              <div className="p-2 bg-slate-100 flex">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="w-full outline-none bg-transparent"
                  placeholder="enter password"
                  onChange={onChangeHandler}
                  required
                />
                <div
                  className=""
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? (
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
            <div></div>
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
              <span>Sign Up</span>
            </button>
          </form>
          <p className="py-4">
            Already have an account?{' '}
            <Link
              to="/login"
              className=" text-red-600 hover:underline hover:text-red-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
