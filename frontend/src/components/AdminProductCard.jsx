import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import InCurrency from '../utils/InCurrency';
import ProductUpdate from './ProductUpdate';

const AdminProductCard = ({ product, fetchData }) => {
  const [showProductUploadModal, setShowProductUploadModal] = useState(false);
  const { name, imageUrls, discountPrice } = product;

  return (
    <div className="w-48 bg-white rounded-lg hover:shadow box-border hover:scale-[101%] hover:transition-all">
      <img
        className="w-full h-40 mx-auto object-cover rounded-t-lg"
        src={imageUrls[0]}
        alt={name}
      />
      <div className="p-2">
        <h3>{name}</h3>
        <div className="flex justify-between">
          <h3 className="font-semibold">{InCurrency(discountPrice)}</h3>
          <button
            className=" bg-green-100 w-9 h-9 rounded-full hover:bg-green-500 hover:text-white "
            onClick={() => setShowProductUploadModal(true)}
          >
            <FaPen className=" w-full mx-auto  " />
          </button>
        </div>
      </div>

      {showProductUploadModal && (
        <ProductUpdate
          showModal={setShowProductUploadModal}
          product={product}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
