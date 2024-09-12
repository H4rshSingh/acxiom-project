// app/api/create-product/route.js
import { dbConnect } from '@/lib/mongoose';
import Product from '@/lib/models/product.model';
import User from '@/lib/models/user.model';
import { verifyToken } from '@/lib/actions/auth'; 

export async function POST(req) {
//   const { productId , quantity } = await req.json();
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  const decoded = verifyToken(token);

  try {
    await dbConnect();
    
    const user = await User.findById(decoded?.id).populate('cart.product');
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // const product = await Product.findById(productId);
    // user.cart.push({ product: product._id, quantity: quantity });
    // user.save();

    return new Response(JSON.stringify({ cart : user.cart }), { status: 201 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
