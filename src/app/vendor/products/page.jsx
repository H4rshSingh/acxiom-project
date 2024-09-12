"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function VendorProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('/api/vendor/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred. Please try again.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button onClick={() => window.history.back()} className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded">
        Back
      </button>
      <h1 className="text-3xl font-bold text-blue-600">Your Products</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mt-6 w-full flex-wrap bg-white p-8 rounded flex gap-4">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="mb-4 p-4 border border-gray-300">
              <h2 className="text-xl text-black font-bold">{product.name}</h2>
              <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-auto mt-2" />
              <p className="mt-2 text-gray-700">Price: Rs {product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
