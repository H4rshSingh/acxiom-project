"use client";
import Link from "next/link";
import React from "react";

const VendorDashboard = () => {

    const logout = async () => {
        try {
            // const response = await axios.get('/api/vendor/logout');
            // console.log(response.data);
            localStorage.removeItem('token');
            window.location.href = '/vendor/login';
        } catch (error) {
            console.log(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

  return (
    <>
      <div className="flex flex-col items-center pt-16 min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome to your dashboard
        </h1>
        <div className="mt-6 w-full  bg-white p-8 shadow-lg rounded max-w-screen-xl">
          <div className="mt-6 flex justify-around">
            <Link
              href="/vendor/products"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Your Item
            </Link>

            <Link
              href="/vendor/createproduct"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Add new item
            </Link>

            <Link
              href="/vendor/orders"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Transaction
            </Link>
            <div onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
