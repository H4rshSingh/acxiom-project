import User from "@/lib/models/user.model";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse request body
    const { name, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    // Return success message
    return NextResponse.json({ message: "User registered successfully" },{ status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}