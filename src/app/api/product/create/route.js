// app/api/create-product/route.js
import { dbConnect } from '@/lib/mongoose';
import Product from '@/lib/models/product.model';
import Vendor from '@/lib/models/vendor.model';
import { verifyToken } from '@/lib/actions/auth'; 

export async function POST(req) {
  const { name, image, price } = await req.json();
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  const decoded = verifyToken(token);

  try {
    await dbConnect();
    
    const vendor = await Vendor.findById(decoded.id);
    if (!vendor) {
      return new Response(JSON.stringify({ message: 'Vendor not found' }), { status: 404 });
    }

    const newProduct = new Product({ name, image, price, vendor: vendor._id });
    await newProduct.save();
    // console.log(vendor)
    // vendor.products.push(newProduct._id);
    // await vendor.save();

    return new Response(JSON.stringify({ message: 'Product created successfully' }), { status: 201 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
