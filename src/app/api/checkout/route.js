import { dbConnect } from "@/lib/mongoose";
import Order from "@/lib/models/order.model";
import Product from "@/lib/models/product.model";
import { verifyToken } from "@/lib/actions/auth";
import User from "@/lib/models/user.model";

export async function POST(req) {
//   const { userId, vendorId, items } = await req.json(); // items: [{ productId, quantity }]
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const decoded = verifyToken(token);
  try {
    await dbConnect();

    const user = await User.findById(decoded?.id).populate('cart.product');
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Fetch products and calculate total amount
    // console.log(user.cart);
    const productIds = user.cart.map((item) => item.product._id);
    const products = await Product.find({ _id: { $in: productIds } });

    let totalAmount = 0;
    const orderProducts = products.map((product) => {
    //   const quantity = user.cart.find(
    //     (item) => item.product._id === product._id.toString()
    //   ).product.quantity;
      totalAmount += product.price

      return {
        product: product._id,
        quantity : 1,
      };
    });

    const order = new Order({
      user: user.id,
      vendor: products[0].vendor,
      products: orderProducts,
      totalAmount,
      status: "Pending",
    });

    await order.save();
    user.cart = [];
    await user.save();
    return new Response(
      JSON.stringify({ message: "Order placed successfully", order }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "An error occurred", error }),
      { status: 500 }
    );
  }
}
