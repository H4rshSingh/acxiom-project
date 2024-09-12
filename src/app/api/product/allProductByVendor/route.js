import { dbConnect } from '@/lib/mongoose';
import Product from '@/lib/models/product.model';

export async function GET(request) {
  try {
    await dbConnect();

    // Get vendorId from the request URL
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');

    if (!vendorId) {
      return new Response(JSON.stringify({ message: 'Vendor ID is required' }), { status: 400 });
    }

    // Fetch products by vendorId
    const products = await Product.find({ vendor: vendorId }).populate('vendor');

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
