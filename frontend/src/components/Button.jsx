import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button
      className=" bg-red-600 flex text-white px-3 py-1.5 rounded-full hover:bg-red-700 "
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
