"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/vendor/login", {
        email,
        password,
      });

      // Handle success response
      setSuccessMessage("Login successful!");
      setError(null); // Clear any previous error

      // Save the JWT token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to vendor dashboard or home page
      setTimeout(() => {
        window.location.href = "/vendor/dashboard"; // Update this path as necessary
      }, 1500);
    } catch (error) {
      // Handle error response
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Link
        href={"/"}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded"
      >
        Home
      </Link>
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-300 text-black rounded"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-blue-600">Vendor Login</h1>
      <form
        onSubmit={handleLogin}
        className="mt-6 w-full max-w-md bg-white p-8 shadow-lg rounded"
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-black">
        Dont have an account?{" "}
        <Link href="/vendor/signup" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
