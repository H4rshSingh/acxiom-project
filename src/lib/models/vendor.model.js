import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
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
  businessName: {
    type: String,
    required: true,
  },
  products:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  // category: {
  //   type: String,
  //   required: true,
  // },
});

const Vendor =  mongoose.models.Vendor ||  mongoose.model('Vendor', vendorSchema) ;

export default Vendor;
