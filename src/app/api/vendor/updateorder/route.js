
import Order from '@/lib/models/order.model';
import Vendor from '@/lib/models/vendor.model';
import { verifyToken } from '@/lib/actions/auth';
import { dbConnect } from '@/lib/mongoose';

export async function PUT(req) {
    // const { id } = params;
    const { status, id } = req.body;
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    const decoded = verifyToken(token);
    
    try {
        await dbConnect();
    
        const vendor = await Vendor.findById(decoded?.id);
        if (!vendor) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        const order = await Order.findById(id);
        if (!order) {
            return new Response(JSON.stringify({ message: 'Order not found' }), { status: 404 });
        }

        if (order.vendor.toString() !== vendor._id.toString()) {
            return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        order.status = status;
        await order.save();

        return new Response(JSON.stringify({ message: 'Order status updated' }), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'An error occurred', error }), { status: 500 });
    }
}