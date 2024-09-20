import { dbConnect } from '@/lib/mongoose';
import User from '@/lib/models/user.model';

export async function GET(req) {
  try {
    await dbConnect();

    const users = await User.find({}, { password: 0 }); // Exclude password field
    if (!users) {
      return new Response(JSON.stringify({ message: 'No users found' }), { status: 404 });
    }

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  }
}
