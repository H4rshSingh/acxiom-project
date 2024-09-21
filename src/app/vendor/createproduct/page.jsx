"use client";

import { useState } from "react";
import axios from "axios";

export default function CreateProductPage() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle image upload
  const handleImageUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.url);
      setImageUrl(response.data.url);
      setError(null);
      setUploading(false);
    } catch (err) {
      setError("Image upload failed.");
      setUploading(false);
    }
  };

  // Handle product creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!productName || !price || !imageUrl) {
      setError("Please fill out all fields and upload an image.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/product/create",
        {
          name: productName,
          price,
          image: imageUrl, // Pass uploaded image URL
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Product created successfully!");
        setProductName("");
        setPrice("");
        setImage(null);
        setImageUrl(null);
      }
    } catch (err) {
      setError("Failed to create the product.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold text-blue-600 mb-6">Create Product</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload Image:</label>
          <input type="file" className="text-black" onChange={handleImageUpload} />
          {imageUrl && (
            <p className="text-green-500 mt-2">Image uploaded successfully!</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-500" disabled={uploading}
        >
          {uploading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
