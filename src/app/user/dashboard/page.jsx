"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const UserDashboard = () => {
    // const categories = ["IT", "Finance", "Education", "Healthcare"]; 
    // const router = useRouter();

    useEffect(() => {
      if (!localStorage.getItem("token")) {
        window.location.href = "/user/login";
      }
    }, []);

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/vendor/login";
    } catch (error) {
      console.log(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center pt-16 min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">Welcome User</h1>
        <div className="mt-6 w-full  bg-white p-8 shadow-lg rounded max-w-screen-xl">
          <div className="mt-6 flex justify-around">
            <Link
              href="/vendor/all"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <div className="mb-4 flex space-x-6 items-center">
                <label className="block text-white">Vendors</label>
                {/* <select
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1 text-black"
                  value={categories}
                  onChange={(e) => router.push(`/vendor/category/${e.target.value}`)}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select> */}
              </div>
            </Link>

            <Link
              href="/user/cart"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Cart
            </Link>

            <Link
              href="/user"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Guest List
            </Link>
            <Link
              href="/user/orders"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Order Status
            </Link>
            <div
              onClick={logout}
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

export default UserDashboard;
