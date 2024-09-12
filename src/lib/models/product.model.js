import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // URL of the image
  price: { type: Number, required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }, // Reference to vendor
});

const Product = mongoose.models.Product ||  mongoose.model('Product', ProductSchema);

export default Product;