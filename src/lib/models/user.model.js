import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  membershipStatus: {
    type: String,
    default: 'free', // Example field for regular users
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  cart : [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
