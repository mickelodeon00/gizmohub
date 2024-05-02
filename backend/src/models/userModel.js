import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image: { type: String, default: '' },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'vendor', 'customer'],
      default: 'customer',
      required: true,
    },
    isPremiumVendor: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
