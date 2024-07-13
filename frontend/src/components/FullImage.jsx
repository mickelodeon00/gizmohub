import React from 'react';
import { IoClose } from 'react-icons/io5';
import useClickOutside from '../hooks/useClickOutside';

const FullImage = ({ imageUrl, showImage }) => {
  const dropModal = useClickOutside(() => showImage(false));
  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div
        className=" bg-white max-w-5xl mx-auto p-4 flex flex-col rounded-xl"
        ref={dropModal}
      >
        <div className="flex justify-end">
          <button
            className="text-3xl hover:text-red-600"
            onClick={() => showImage(false)}
          >
            <IoClose />
          </button>
        </div>
        <div className=" flex justify-center max-w-[80vh] max-h-[80vh]">
          <img className=" object-contain" src={imageUrl} alt="big size " />
        </div>
      </div>
    </div>
  );
};

export default FullImage;
