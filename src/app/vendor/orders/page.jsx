"use client";

import { useEffect, useState } from "react";

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch orders for the vendor's products
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("/api/vendor/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders.reverse());
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    console.log(orderId, newStatus);
    try {
      const response = await fetch(`/api/vendor/orders/${orderId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred while updating the order status.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Orders for Your Products
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      {orders.length > 0 ? (
        <table className="min-w-full bg-white shadow-lg rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Products</th>
              <th className="py-3 px-6 text-left">Total Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{order._id}</td>
                <td className="py-3 px-6">
                  {order.products.map((item) => (
                    <p key={item.product}>
                      {item.product.name}
                    </p>
                  ))}
                </td>
                <td className="py-3 px-6">Rs. {order.totalAmount}</td>
                <td className="py-3 px-6">{order.status}</td>
                <td className="py-3 px-6">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
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
