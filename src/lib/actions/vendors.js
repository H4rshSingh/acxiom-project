import Vendor from "../models/vendor.model";
import { dbConnect } from "../mongoose";

export async function getAllVendorCategory() {
  try {
    await dbConnect();
    const vendor = Vendor.find().select('category');
    console.log(vendor);
    return vendor;
  } catch (error) {
    console.log(error);
    return null;
  }
}