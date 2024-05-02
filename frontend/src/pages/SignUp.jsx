import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

import LoginIcon from '../assets/signin.gif';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [file, setFile] = useState('');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: '',
  });

  useEffect(() => {
    if (file) {
      setData((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
    }
  }, [file]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const photoChangeHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const uploadToCloud = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'GIZMOHUB/profile');
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
    const { data: uploadData } = await axios.post(
      `${process.env.REACT_APP_CLOUDINARY_URL}`,
      formData
    );
    return uploadData?.secure_url;
    // setData((prev) => ({ ...prev, photo: uploadData?.secure_url }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let imgUrl = file ? await uploadToCloud() : '';
    imgUrl = imgUrl ? imgUrl : '';

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/user/signup`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          image: imgUrl,
        }
      );
      console.log('data', response);
    } catch (err) {
      console.log('error', err);
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
                src={data.photo || LoginIcon}
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
                  onChange={photoChangeHandler}
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
                  onChange={(e) => onChangeHandler(e)}
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
                  onChange={(e) => onChangeHandler(e)}
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
                  onChange={(e) => onChangeHandler(e)}
                  required
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
            <div className="">
              <label>Confirm Password : </label>
              <div className="p-2 bg-slate-100 flex">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirm-password"
                  className="w-full outline-none bg-transparent"
                  placeholder="enter password"
                  onChange={(e) => onChangeHandler(e)}
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
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] mx-auto mt-7 rounded-full hover:scale-110 hover:transition-all hover:bg-red-700 block"
            >
              Sign Up
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
