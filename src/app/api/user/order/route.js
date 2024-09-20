import { dbConnect } from "@/lib/mongoose";
import Order from "@/lib/models/order.model";
import { verifyToken } from "@/lib/actions/auth";
import User from "@/lib/models/user.model";

export async function GET(req) {
  //   const userId = req.headers.get('userid');
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const decoded = verifyToken(token);
    console.log(decoded);
  try {
    await dbConnect();
    const user = await User.findById(decoded?.id);
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const orders = await Order.find({ user: user._id }).populate(
      "products.product"
    );
    if (!orders.length) {
      return new Response(JSON.stringify({ message: "No orders found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ orders }), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({ message: "An error occurred", error }),
      { status: 500 }
    );
  }
}
