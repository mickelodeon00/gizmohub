import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FaSearch } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';

import Logo from './Logo';
import { AppContext } from '../contexts/AppContext';
import { toast } from 'react-toastify';
import { Dropdown, DropdownItem } from './Dropdown';

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(AppContext);
  const { user } = state;
  const logout = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('token');
    toast.error('Logged out successfully');
  };
  return (
    <header className="h-16 shadow-md bg-white">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between ">
        <Link className="" to={'/'}>
          <Logo w={90} h={50} />
        </Link>
        <div className="hidden lg:flex items-center w-full max-w-sm justify-between pl-2 border rounded-full focus-within:shadow  ">
          <input
            className="w-full outline-none "
            type="text"
            placeholder="search products here..."
          />
          <div className=" text-lg bg-red-600 min-w-[50px] h-8  rounded-e-full flex items-center justify-center ">
            <FaSearch />
          </div>
        </div>
        <div className="flex items-center gap-6">
          {user && (
            <Dropdown
              trigger={
                <div className="text-3xl">
                  {user?.image ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={user.image}
                        alt="user"
                      />
                    </div>
                  ) : (
                    <FaRegUserCircle />
                  )}
                </div>
              }
            >
              <DropdownItem>
                <Link to="/admin/products">Admin panel</Link>
              </DropdownItem>
            </Dropdown>
          )}

          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="text-sm bg-red-600 h-5 w-5 flex items-center justify-center rounded-full absolute -top-2 -right-3">
              0
            </div>
          </div>
          {user ? (
            <Link
              className="bg-red-600 hover:bg-red-700 cursor-pointer px-3 py-1 rounded-full text-white"
              to="/"
              onClick={logout}
            >
              Logout
            </Link>
          ) : (
            <Link
              className="bg-red-600 hover:bg-red-700 cursor-pointer px-3 py-1 rounded-full text-white"
              to="login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
