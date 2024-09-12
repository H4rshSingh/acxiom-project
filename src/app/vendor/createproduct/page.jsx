"use client";   
import { useState } from 'react';
import axios from 'axios';

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('/api/product/create', {
        name,
        image,
        price,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage(response.data.message);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button onClick={() => window.history.back()} className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded">
        Back
      </button>
      <h1 className="text-3xl font-bold text-blue-600">Create Product</h1>
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md bg-white p-8 shadow-lg rounded">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 text-black"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 text-black"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
