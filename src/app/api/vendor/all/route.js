import { dbConnect } from '@/lib/mongoose';
import Vendor from '@/lib/models/vendor.model';

export async function GET(req) {
  try {
    await dbConnect();
    const vendor = await Vendor.find();
    return new Response(JSON.stringify(vendor), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
