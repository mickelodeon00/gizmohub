import { useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';

export const Dropdown = ({ children, trigger }) => {
  const [show, setShow] = useState(false);
  const dropRef = useClickOutside(() => setShow(false));
  return (
    <div
      ref={dropRef}
      className="relative w-fit"
      onClick={() => setShow((prev) => !prev)}
    >
      {trigger}
      {show && (
        <ul className=" absolute min-w-max right-0 bg-white shadow mt-2 rounded-lg overflow-hidden ">
          {children}
        </ul>
      )}
    </div>
  );
};

export const DropdownItem = ({ children }) => {
  return (
    <li className=" flex hover:bg-slate-50  px-4 py-1 cursor-pointer">
      {children}
    </li>
  );
};
