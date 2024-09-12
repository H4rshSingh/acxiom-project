import { dbConnect } from '@/lib/mongoose';
// import Vendor from '@/lib/models/vendor.model';
import Product from '@/lib/models/product.model';
import { verifyToken } from '@/lib/actions/auth';

export async function GET(req) {
  try {
    await dbConnect();
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (!decoded) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    // const vendor = await Vendor.findById(decoded.id).populate('products');
    // if (!vendor) {
    //   return new Response(JSON.stringify({ message: 'Vendor not found' }), { status: 404 });
    // }

    const products = await Product.find({ vendor: decoded.id });
    console.log(products);
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
