import { dbConnect } from '@/lib/mongoose';
import Vendor from '@/lib/models/vendor.model';
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    const vendor = await Vendor.findByIdAndDelete(id);
    if (!vendor) {
      return new Response(JSON.stringify({ message: 'Vendor not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Vendor deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
