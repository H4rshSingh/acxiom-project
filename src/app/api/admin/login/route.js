import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from "@/lib/models/admin.model";
import { dbConnect } from "@/lib/mongoose";

export async function POST(request) {
    try {
      // Connect to MongoDB
      await dbConnect();
  
      // Parse request body
      const { email, password } = await request.json();
  
      // Check if vendor exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: admin._id, role: 'admin' },
        process.env.JWT_SECRET, // Make sure you have this in your .env file
        { expiresIn: '1h' }
      );
  
      // Return the token
      return NextResponse.json({ token }, { status: 200 });
      
    } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
  