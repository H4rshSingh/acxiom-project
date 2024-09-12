"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AllVendors() {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('/api/vendor/all');
        console.log(response.dataa)
        setVendors(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred. Please try again.');
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button onClick={() => window.history.back()} className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded">
        Back
      </button>
      <h1 className="text-3xl font-bold text-blue-600">Vendors</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mt-6 w-full flex-wrap bg-white p-8 rounded flex gap-4">
        {vendors.length === 0 ? (
          <p>No vendors found.</p>
        ) : (
          vendors.map((vendor) => (
            <div key={vendor._id} className="mb-4 p-4 border border-gray-300">
              <h2 className="text-xl text-black font-bold pb-6">{vendor.name}</h2>
              <Link href={`/products/vendor/${vendor._id}`} className=" text-gray-700 border p-2 mt-4">Shop Items</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
