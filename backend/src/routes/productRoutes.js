import express from 'express';
import AuthCheck from '../helpers/middleware.js';
import ProductServices from '../services/ProductServices.js';

const productRouter = express.Router();

productRouter
  .route('/')
  .get(
    AuthCheck.checkAuthStatus,
    AuthCheck.checkToken,
    ProductServices.getAllProducts
  )
  .post(
    AuthCheck.checkAuthStatus,
    AuthCheck.checkToken,
    ProductServices.createProduct
  )
  .put(
    AuthCheck.checkAuthStatus,
    AuthCheck.checkToken,
    AuthCheck.authorize('ADMIN', 'VENDOR'),
    ProductServices.updateProduct
  );

export default productRouter;
