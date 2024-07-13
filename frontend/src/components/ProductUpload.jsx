import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

import Dropzone from './Dropzone';
import useClickOutside from '../hooks/useClickOutside';
import { productCategory } from '../utils/constant';
import { uploadMultipleImages } from '../utils/cloudUpload';
import { getError } from '../utils/util';
import { postRequest } from '../utils/apiCall';
import { CREATE_PRODUCT } from '../utils/apiUrl';
import FullImage from './FullImage';

const ProductUpload = ({ showModal, fetchData }) => {
  const dropModal = useClickOutside(() => showModal(false));
  const [fullImage, setFullImage] = useState(false);
  const [currentImgUrl, setCurrentImgUrl] = useState(null);
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'others',
    description: '',
    price: '',
    selling: '',
  });

  const showFullImage = (file) => {
    setCurrentImgUrl(file);
    setFullImage(true);
  };

  const removeFile = (i) => {
    setFiles((prev) => prev.filter((_, index) => index !== i));
  };
  const removeRejectedFile = (i) => {
    setRejected((prev) => prev.filter((_, index) => index !== i));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      return toast.warning(`upload Images for ${formData.name}`);
    } else if (files.length < 3) {
      return toast.warning('Add more images. Min. of 3');
    } else if (files.length > 6) {
      return toast.warning('Remove some images. Max. of 6');
    }

    const imgs = await uploadMultipleImages(files, formData.category);

    try {
      const payload = {
        ...formData,
        imageUrls: imgs,
      };
      const { data: createdProduct } = await postRequest({
        url: CREATE_PRODUCT,
        data: payload,
      });
      console.log('createdProduct Youst', createdProduct);
      toast.success('Product Upload was successful');
      fetchData();
      showModal(false);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="fixed transparent-10 bg-slate-200 flex justify-center items-center w-full h-full left-0 right-0 top-0 bottom-0">
      <div
        className="relative flex flex-col bg-white w-[90%] max-w-2xl pb-4 rounded h-[80%] overflow-y-auto custom-scrollbar"
        ref={dropModal}
      >
        <div className="sticky top-0 bg-inherit px-4 py-2 flex justify-between font-semibold">
          <h2>Upload product </h2>
          <div onClick={() => showModal(false)}>
            <IoClose className="text-3xl cursor-pointer hover:text-red-700" />
          </div>
        </div>
        <form
          className="flex flex-col gap-2 px-6 pt-2 overflow-y-auto custom-scrollbar  "
          onSubmit={handleSubmit}
        >
          <label>
            <h2>Product Name : </h2>
            <div className="p-2 bg-slate-100 rounded">
              <input
                className="w-full outline-none bg-transparent h-8"
                type="text"
                name="name"
                placeholder="Enter product name"
                onChange={handleOnChange}
                required
              />
            </div>
          </label>
          <label>
            <h2>Brand Name : </h2>
            <div className="p-2 bg-slate-100 rounded">
              <input
                className="w-full outline-none bg-transparent h-8  "
                type="text"
                name="brand"
                placeholder="Enter brand name"
                onChange={handleOnChange}
                required
              />
            </div>
          </label>
          <label>
            <h2>Category : </h2>
            <div className="p-2 bg-slate-100 rounded">
              <select
                className="w-full h-8 bg-inherit outline-none cursor-pointer"
                name="category"
                value={formData.category}
                onChange={handleOnChange}
              >
                {productCategory.map(({ label, value }, ind) => (
                  <option key={`prodItem${ind}`} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <div className="flex flex-col">
            <h2>Product Image : </h2>

            {/* <label className=" bg-slate-100 rounded w-full cursor-pointer mb-10">
              <input
                className=" hidden w-full outline-none "
                type="file"
                multiple
                onChange={(e) =>
                  setFiles((prev) => [...prev, ...e.target.files])
                }
              />
              <div className="flex flex-col justify-center items-center bg-inherit py-8 ">
                <FaCloudUploadAlt className="text-5xl text-slate-500 " />
                <p className="text-slate-400">Upload Product Image</p>
              </div>
            </label> */}
            <Dropzone
              className="flex flex-col justify-center items-center bg-slate-100 rounded w-full cursor-pointer h-44"
              setFiles={setFiles}
              setRejected={setRejected}
              rejected={rejected}
            />
            <div className="">
              {files.length !== 0 && (
                <div>
                  <div className="mb-4">
                    <h3 className="my-2 ">Accepted Files</h3>
                    <div className=" w-full border-t-2 border-black opacity-30"></div>
                  </div>
                  <ul className="flex flex-wrap gap-2 ">
                    {files.map((file, i) => (
                      <li
                        className="relative w-28 h-28 rounded-xl group "
                        key={i}
                        onClick={() => showFullImage(file.preview)}
                      >
                        <img
                          className=" w-full h-full object-cover rounded-xl"
                          src={file.preview}
                          alt={`${file.name}_pix`}
                        />
                        <span className="hidden group-hover:block absolute inset-0 bg-black bg-opacity-30  rounded-xl cursor-pointer"></span>
                        <MdDelete
                          className="hidden group-hover:block text-3xl text-white cursor-pointer  bg-red-500 rounded-full p-1 absolute right-1 bottom-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(i);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="">
              {rejected.length !== 0 && (
                <div>
                  <div className="mb-4">
                    <h3 className="my-2 ">Rejected Files</h3>
                    <div className=" w-full border-t-2 border-black opacity-30"></div>
                  </div>
                  <ul className="flex flex-col gap-2 ">
                    {rejected.map((file, i) => (
                      <li
                        className=" flex flex-row justify-between group "
                        key={i}
                      >
                        <div>
                          <p>{file.name}</p>
                          {file.errors.map(({ message }, i) => (
                            <p key={i} className="text-red-500 text-sm">
                              {message}
                            </p>
                          ))}
                        </div>
                        <MdDelete
                          className=" text-3xl text-white cursor-pointer  bg-red-500 rounded-full p-1 "
                          onClick={(e) => {
                            removeRejectedFile(i);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <label>
            <h2>Price : </h2>
            <div className="p-2 bg-slate-100 rounded">
              <input
                className="w-full outline-none bg-transparent h-8"
                type="number"
                name="price"
                placeholder="Enter product price"
                onChange={handleOnChange}
                required
              />
            </div>
          </label>
          <label>
            <h2>Selling Price : </h2>
            <div className="p-2 bg-slate-100 rounded">
              <input
                className="w-full outline-none bg-transparent h-8"
                type="number"
                name="selling"
                placeholder="Reduced price"
                onChange={handleOnChange}
                required
              />
            </div>
          </label>
          <label>
            <h2>Description : </h2>
            <div className="p-2 bg-slate-100 rounded">
              <textarea
                className="w-full outline-none bg-transparent h-24"
                rows={4}
                name="description"
                placeholder="product description"
                onChange={handleOnChange}
                required
              />
            </div>
          </label>
          <button
            className="w-full py-2 bg-red-500 text-white text-xl"
            type="submit"
          >
            Upload Product
          </button>
        </form>

        {/* Show full Image */}

        {fullImage && (
          <FullImage imageUrl={currentImgUrl} showImage={setFullImage} />
        )}
      </div>
    </div>
  );
};

export default ProductUpload;
