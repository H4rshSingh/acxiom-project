import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "@/lib/models/user.model";
import { dbConnect } from "@/lib/mongoose";

export async function POST(request) {
    try {
      // Connect to MongoDB
      await dbConnect();
  
      // Parse request body
      const { email, password } = await request.json();
  
      // Check if vendor exists
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: 'user' },
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
  