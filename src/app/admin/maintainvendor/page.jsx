"use client";
import { useEffect, useState } from 'react';

export default function AllVendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch all vendors on component mount
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('/api/vendors', {
          method: 'GET',
        });

        const data = await response.json();
        if (response.ok) {
          setVendors(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('An error occurred while fetching vendors.');
      }
    };

    fetchVendors();
  }, []);

  // Handle vendor deletion
  const handleDelete = async (vendorId) => {
    const confirmDelete = confirm('Are you sure you want to delete this vendor?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/vendors/${vendorId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        // Remove the vendor from the state after successful deletion
        setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
        setMessage(data.message);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while deleting the vendor.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button onClick={() => window.history.back()} className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded">
        Back
      </button>

      <h1 className="text-3xl font-bold text-blue-600 mb-6">All Vendors</h1>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      {vendors.length > 0 ? (
        <table className="min-w-full bg-white shadow-lg rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {vendors.map((vendor) => (
              <tr key={vendor._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{vendor.name}</td>
                <td className="py-3 px-6 text-left">{vendor.email}</td>
                <td className="py-3 px-6 text-left">
                  {new Date(vendor.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => handleDelete(vendor._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vendors found.</p>
      )}
    </div>
  );
}
