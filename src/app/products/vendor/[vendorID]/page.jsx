"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VendorProducts({ params }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
    const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/api/product/allProductByVendor?vendorId=${params.vendorID}`
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      }
    };

    fetchProducts();
  }, []);

  const addProductToCart = async (productId) => {
    console.log(productId);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/api/user/cart/add",
        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push(`/user/cart`)
      console.log(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-black rounded"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-blue-600 mt-20">
        {products && products[0]?.vendor?.name}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mt-6 w-full flex-wrap bg-white p-8 rounded flex gap-4 justify-center">
        {products.length === 0 ? (
          <p className="text-black">No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="mb-4 p-4 border border-gray-300">
              <h2 className="text-xl text-black font-bold">{product.name}</h2>
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-auto mt-2"
              />
              <p className="mt-2 text-gray-700">Price: Rs {product.price}</p>

              <button onClick={()=>{addProductToCart(product._id)}} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
