"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  // const categories = ["IT", "Finance", "Education", "Healthcare"];
  // const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin/login";
    }
  }, []);

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    } catch (error) {
      console.log(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center pt-16 min-h-screen bg-gray-100">
        <Link
          href={"/"}
          className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded"
        >
          Home
        </Link>
        <button
          onClick={() => logout()}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-300 text-black rounded"
        >
          Logout
        </button>
        <h1 className="text-3xl font-bold text-blue-600">Welcome Admin</h1>
        <div className="mt-6 w-full  bg-white p-8 shadow-lg rounded max-w-screen-xl">
          <div className="mt-6 flex justify-around">
            <Link
              href="/admin/maintainuser"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Maintain User
            </Link>

            <Link
              href="/admin/maintainvendor"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Maintain Vendor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
