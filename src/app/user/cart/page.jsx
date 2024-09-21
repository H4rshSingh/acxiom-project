"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/user/cart/cartItems",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setCartItems(response.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    setTotal(cartItems.reduce((acc, item) => acc + item.product.price, 0));
  }, [cartItems]);

  const removeItem = async (productId) => {
    console.log(productId);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/api/user/cart/remove",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCartItems();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({ userId, vendorId, items }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchCartItems();
        alert(data.message);
        // setMessage(data.message);
        // setError(null);
      } else {
        alert(data.message);
        // setError(data.message);
      }
    } catch (err) {
      console.log("An error occurred during checkout.", err);
    }
  };

  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded"
      >
        Back
      </button>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl bg-white p-8 shadow-lg rounded">
          <h1 className="text-3xl text-center font-bold text-blue-600">Cart</h1>
          <div className=" scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-y-scroll h-96">
            {cartItems.length === 0 && (
              <p className="text-center text-gray-500">No items in cart</p>
            )}
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex items-center">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                    width={64}
                    height={64}
                  />
                  <div className="ml-4">
                    {/* <h2 className="text-lg font-semibold">{item.product.name}</h2> */}
                    <p className="text-sm text-gray-500">
                      Rs. {item.product.price}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    className="text-red-500"
                    onClick={() => removeItem(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4 text-black gap-4">
            <p className="text-lg">Total :</p>
            <p className="text-lg">Rs. {total}</p>
          </div>
        </div>

        {/* <div className="w-full max-w-2xl bg-white p-8 shadow-lg rounded mt-4">
          <h1 className="text-3xl text-center font-bold text-blue-600">Total</h1>
          <div className="flex justify-between mt-4">
            <p className="text-lg">Subtotal</p>
            <p className="text-lg">Rs. 1000</p>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-lg">Shipping</p>
            <p className="text-lg">Rs. 100</p>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-lg">Total</p>
            <p className="text-lg">Rs. 1100</p>
        </div>
        </div> */}

        <button
          onClick={handleCheckout}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-500"
          disabled={cartItems.length <= 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
