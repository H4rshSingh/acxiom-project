
import Order from '@/lib/models/order.model';
import Vendor from '@/lib/models/vendor.model';
import { verifyToken } from '@/lib/actions/auth';
import { dbConnect } from '@/lib/mongoose';

export async function GET(req) {
//   const vendorId = req.headers.get('vendorid'); // Assuming the vendor ID is passed via headers

const token = req.headers.get('Authorization')?.replace('Bearer ', '');
const decoded = verifyToken(token);

console.log(decoded);

  try {
    await dbConnect();

    const vendor = await Vendor.findById(decoded?.id);
    if (!vendor) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const orders = await Order.find({ vendor: vendor._id }).populate('products.product');
    if (!orders.length) {
        return new Response(JSON.stringify({ message: 'No orders found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ orders }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'An error occurred', error }), { status: 500 });
    }
  }