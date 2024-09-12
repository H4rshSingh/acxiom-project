"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const categories = ["IT", "Finance", "Education", "Healthcare"]; // Example categories

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/register", {
        name,
        email,
        password,
        category,
      });

      setSuccessMessage("Admin registered successfully!");
      setError(null);

      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 1500);
    } catch (error) {
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
      <h1 className="text-3xl font-bold text-blue-600">Admin Signup</h1>
      <form
        onSubmit={handleSignup}
        className="mt-6 w-full max-w-md bg-white p-8 shadow-lg rounded"
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

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
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 text-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-black">
        Already have an account?{" "}
        <Link href="/admin/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
}
