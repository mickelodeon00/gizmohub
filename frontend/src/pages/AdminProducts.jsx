import React, { useEffect, useState } from 'react';

import AdminProductCard from '../components/AdminProductCard';

import ProductUpload from '../components/ProductUpload';
import { getRequest } from '../utils/apiCall';
import { FETCH_PRODUCTS_BY_USER } from '../utils/apiUrl';

const AdminProducts = () => {
  const [showProductUploadModal, setShowProductUploadModal] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await getRequest({ url: FETCH_PRODUCTS_BY_USER });
      // console.log('products', data);
      setProducts(data);
    } catch (err) {
      console.log('ERROR', err);
      // toast.error(getError(err));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex justify-between items-center p-4 bg-white">
        <p className="font-bold text-xl">All Products</p>
        <button
          className="px-3 py-1 border-2 border-red-400 rounded-full text-red-600 bg-white hover:bg-red-500 hover:text-white transition-all "
          onClick={() => setShowProductUploadModal(true)}
        >
          Upload product
        </button>
      </div>
      <div className="">
        <ul className="flex gap-2 flex-wrap ">
          {products &&
            products.map((product, ind) => (
              <li key={`${product.name}_${ind}`}>
                <AdminProductCard product={product} fetchData={fetchData} />
              </li>
            ))}
        </ul>

        {/* <table className="bg-white table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>brand</th>
              <th>Category</th>
              <th>price</th>
              <th>description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.slice(0, 10).map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="left-text">{product.name}</td>
                  <td className="">{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td className="">{product.description}</td>
                  <td>
                    <button
                      className="bg-green-100 p-1 rounded-full hover:bg-green-400 hover:text-white"
                      // onClick={() => editProduct(product)}
                    >
                      <FaPen className="" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table> */}
      </div>
      {showProductUploadModal && (
        <ProductUpload
          showModal={setShowProductUploadModal}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProducts;
