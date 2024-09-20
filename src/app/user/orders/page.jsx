"use client";

import { useEffect, useState } from 'react';

export default function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/user/order', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          console.log(data.orders);
          setOrders(data.orders);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('An error occurred while fetching orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button onClick={() => window.history.back()} className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded">
        Back
      </button>

      <h1 className="text-3xl font-bold text-blue-600 mb-6">Your Orders</h1>

      {error && <p className="text-red-500">{error}</p>}

      {orders.length > 0 ? (
        <table className="min-w-full bg-white shadow-lg rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Products</th>
              <th className="py-3 px-6 text-left">Total Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{order._id}</td>
                <td className="py-3 px-6">
                  {order.products.map((item) => (
                    <p key={item.product}>{item.product.name} </p>
                  ))}
                </td>
                <td className="py-3 px-6">Rs. {order.totalAmount}</td>
                <td className="py-3 px-6">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
