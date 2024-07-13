import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'airpodes',
        'camera',
        'earphones',
        'mobile',
        'mouse',
        'printers',
        'processor',
        'refrigerator',
        'speakers',
        'trimmers',
        'TV',
        'watches',
        'others',
      ],
      default: 'others',
      required: true,
    },
    imageUrls: { type: Array, default: [], required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    description: { type: String, required: true },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model('Product', productSchema);
