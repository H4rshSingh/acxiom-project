import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer()); // Convert file to Buffer
    const base64String = buffer.toString('base64'); // Convert buffer to base64

    // Upload to Cloudinary using base64 string
    const result = await cloudinary.uploader.upload(`data:${file.type};base64,${base64String}`, {
      folder: 'products',
    });
    console.log(result.secure_url);
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.log('Image upload error:', error);
    return NextResponse.json({ message: 'Image upload failed.', error: error.message }, { status: 500 });
  }
}
