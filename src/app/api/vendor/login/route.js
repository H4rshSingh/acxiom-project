import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Vendor from '@/lib/models/vendor.model';  // Assuming the Vendor model is already created
import { dbConnect } from '@/lib/mongoose'; // Utility to connect to the database

export async function POST(request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse request body
    const { email, password } = await request.json();

    // Check if vendor exists
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: vendor._id, role: 'vendor' },
      process.env.JWT_SECRET, // Make sure you have this in your .env file
      { expiresIn: '1h' }
    );

    // Return the token
    return NextResponse.json({ token });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
