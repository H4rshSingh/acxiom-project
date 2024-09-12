// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import Admin from "@/lib/models/admin.model"; 
// import { dbConnect } from "@/lib/mongoose";

// export async function POST(request) {
//   try {
//     // Connect to MongoDB
//     await dbConnect();

//     const { name, email, password, category } = await req.json();
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return NextResponse.json(
//         { message: "Admin with this email already exists" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newAdmin = new Admin({
//       name,
//       email,
//       password: hashedPassword,
//       category,
//     });

//     await newAdmin.save();
//     return NextResponse.json({ message: "Admin registered successfully" },{ status: 201 });
//   } catch (error) {
//     console.error("Registration error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


import Admin from "@/lib/models/admin.model";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await dbConnect();

    const { name, email, password, category } = await request.json();

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      category
    });

    // Save user to database
    await newAdmin.save();

    // Return success message
    return NextResponse.json({ message: "Admin registered successfully" },{ status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}