import React, { useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { FaRegUserCircle } from 'react-icons/fa';
import { AppContext } from '../contexts/AppContext';
import { getRequest } from '../utils/apiCall';

const AdminPanel = () => {
  const { state } = useContext(AppContext);
  const { user } = state;

  return (
    <div className="flex min-h-[calc(100vh-125px)] ">
      <aside className="w-full min-h-full max-w-64 bg-white shadow-md">
        <div className="flex flex-col items-center justify-center h-36">
          <div className=" text-3xl ">
            {user?.image ? (
              <div className="w-20 h-20 rounded-full overflow-hidden">
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
          <p className=" capitalize font-semibold text-lg">{user.name}</p>
          <p className="uppercase text-sm ">{user.role}</p>
        </div>
        <div className="p-1 w-full flex flex-col">
          <Link className="hover:bg-slate-100 w-full px-4 py-2 " to="users">
            Users
          </Link>
          <Link className="hover:bg-slate-100 w-full px-4 py-2 " to="Products">
            Products
          </Link>
        </div>
      </aside>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
