
import { dbConnect } from '@/lib/mongoose';
import User from '@/lib/models/user.model';

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
