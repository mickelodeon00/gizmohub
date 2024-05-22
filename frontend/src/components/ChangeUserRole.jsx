import React from 'react';
import { useState } from 'react';

import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import useClickOutside from '../hooks/useClickOutside';
import { postRequest } from '../utils/apiCall';
import { ADMIN_UPDATE_USER } from '../utils/apiUrl';
import { getError } from '../utils/util';
import Button from './Button';

const ROLE = {
  admin: 'ADMIN',
  vendor: 'VENDOR',
  general: 'GENERAL',
};

const ChangeUserRole = ({ currentUser, setShowModal, fetchData }) => {
  const [userRole, setUserRole] = useState(currentUser.role);
  const dropModal = useClickOutside(() => setShowModal(false));
  const updateUserRole = async () => {
    try {
      const { data } = await postRequest({
        url: ADMIN_UPDATE_USER,
        data: { id: currentUser._id, role: userRole },
      });
      toast.success('Role Updated successfully');
      console.log('dattttta', data);
      fetchData();
      setShowModal(false);
    } catch (err) {
      toast.error(getError(err));
      setShowModal(false);
    }
  };
  return (
    <div className="transparent-10 flex items-center justify-center h-[100vh] absolute z-10  w-full left-0 right-0 top-0 bottom-0">
      <div
        className="w-full max-w-sm flex flex-col  bg-white p-4 rounded-lg shadow-lg"
        ref={dropModal}
      >
        <button
          className="text-3xl flex justify-end "
          onClick={() => setShowModal(false)}
        >
          <IoClose />
        </button>
        <h1 className="font-semibold mb-4">Change User Role</h1>
        <div>
          <p className="capitalize">Name: {currentUser.name}</p>
          <p>Email: {currentUser.email}</p>
        </div>
        <p className="flex justify-between mt-2">
          Role:
          <span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              {Object.values(ROLE).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </span>
        </p>
        {/* <button className='' > Change Role</button> */}
        <div className="flex items-center justify-center">
          <Button onClick={updateUserRole}>Change Role</Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
