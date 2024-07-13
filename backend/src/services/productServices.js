import { Product } from '../models/productModel.js';
import { handleResponse } from '../helpers/util.js';

class ProductServices {
  static async createProduct(req, res) {
    console.log(req.user, req.body, 'see');
    try {
      const productInfo = new Product({
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        imageUrls: req.body.imageUrls,
        price: Number(req.body.price),
        discountPrice: Number(req.body.selling),
        description: req.body.description,
        vendorId: req.user._id,
      });

      const createdProduct = await productInfo.save();
      handleResponse(res, 201, 'Product uploaded succesfully', createdProduct);
    } catch (err) {
      console.log(err, 'ERRRRRRRRR');
      handleResponse(res, 404, 'Product upload failed');
    }
  }

  static async updateProduct(req, res) {
    try {
      const product = await Product.findById(req.body._id);
      if (!product) {
        handleResponse(res, 401, 'product not found');
      }

      const info = {
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        imageUrls: req.body.imageUrls,
        price: Number(req.body.price),
        discountPrice: Number(req.body.selling),
        description: req.body.description,
      };

      const update = await Product.updateOne(
        { _id: req.body._id },
        { $set: info }
      );
      handleResponse(res, 200, 'Product Info updated successfully', update);
    } catch (err) {
      handleResponse(res, 401, 'Unable to update Product data');
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      handleResponse(res, 200, 'Succesful', products);
    } catch (err) {
      handleResponse(res, 401, 'Unable to fetch Products');
    }
  }
}

export default ProductServices;
