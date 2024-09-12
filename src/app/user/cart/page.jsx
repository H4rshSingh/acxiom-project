"use client";
import React, { useEffect, useState } from 'react'

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.post(
                    "/api/user/cart/cartItems",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCartItems(response.data.cart);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCartItems();
    }, []);


  return (
    <div>cart</div>
  )
}
