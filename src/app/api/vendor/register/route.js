import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Vendor from '@/lib/models/vendor.model';  // Assuming the Vendor model is already created
import { dbConnect } from '@/lib/mongoose'; // Utility to connect to the database

export async function POST(request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse request body
    const { name, email, password, businessName } = await request.json();

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return NextResponse.json({ message: 'Vendor with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new vendor
    const newVendor = new Vendor({
      name,
      email,
      password: hashedPassword,
      businessName,
    });

    // Save vendor to database
    await newVendor.save();

    // Return success message
    return NextResponse.json({ message: 'Vendor registered successfully' },{ status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
