
import { dbConnect } from '@/lib/mongoose';
import Vendor from '@/lib/models/vendor.model';

export async function GET(req) {
  try {
    await dbConnect();

    const vendors = await Vendor.find({}, { password: 0 }); // Exclude passwords
    if (!vendors) {
      return new Response(JSON.stringify({ message: 'No vendors found' }), { status: 404 });
    }

    return new Response(JSON.stringify(vendors), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
