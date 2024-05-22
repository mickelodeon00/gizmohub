import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaPen } from 'react-icons/fa';

import { getRequest } from '../utils/apiCall';
import { toast } from 'react-toastify';
import { getError } from '../utils/util';
import { GET_ALL_USERS } from '../utils/apiUrl';
import ChangeUserRole from '../components/ChangeUserRole';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await getRequest({ url: GET_ALL_USERS });
      console.log('users', data);
      setUsers(data);
    } catch (err) {
      console.log('ERROR', err);
      // toast.error(getError(err));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
    console.log('TRUE', showModal);
  };

  return (
    <div className=" p-2 ">
      <table className="bg-white table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.slice(0, 10).map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="left-text">{user.name}</td>
                <td className="no-cap">{user.email}</td>
                <td>{user.role}</td>
                <td>{moment(user.createdAt).format('ll')}</td>
                <td>
                  <button
                    className="bg-green-100 p-1 rounded-full hover:bg-green-400 hover:text-white"
                    onClick={() => editUser(user)}
                  >
                    <FaPen className="" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showModal && (
        <ChangeUserRole
          currentUser={currentUser}
          setShowModal={setShowModal}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default Users;
