"use client";

import React, { useState } from 'react';
import { useProducts } from '../context/productContext_test';

export default function Nav() {
    const [productLink, setProductLink] = useState('');
    const { setProducts } = useProducts();  // Access the setter to update the products context
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (productLink.trim()) {
            try {
                const response = await fetch('http://localhost:3001/api/product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: productLink }),  // Send the product link to backend
                });

                if (response.ok) {
                    const productDetails = await response.json();
                    setProducts([productDetails]);  // Update context with fetched product details
                    setProductLink('');  // Reset the input after submission
                } else {
                    console.error('Error fetching product details');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
    };

    const handleSearchToggle = () => setIsSearchOpen(!isSearchOpen);

    return (
        <nav className="flex justify-between items-center p-4 bg-white border-b">
            <div className="text-lime-800 text-3xl font-['Newsreader']">Bargain Buddy</div>
            <div className="space-x-8">
                <a href="/profile" className="text-lime-800 font-['Newsreader'] hover:underline">My Profile</a>
                <a href="/groceries" className="text-lime-800 font-['Newsreader'] hover:underline">Groceries</a>
                <a href="/tech" className="text-lime-800 font-['Newsreader'] hover:underline" >Technology</a>
                <a href="/settings" className="text-lime-800 font-['Newsreader'] hover:underline">Settings</a>
            </div>
            <button
                className="bg-lime-800 text-white px-4 py-2 rounded"
                onClick={handleSearchToggle}
            >
                Search
            </button>
            {isSearchOpen && (
                <div className="absolute top-0 left-0 w-full bg-gray-100 p-4 mt-2">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                        <input
                            type="text"
                            value={productLink}
                            onChange={(e) => setProductLink(e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg"
                            placeholder="Paste product link here..."
                        />
                        <button className="px-4 py-2 bg-lime-800 text-white rounded-lg">
                            Add to Wishlist
                        </button>
                    </form>
                </div>
            )}
        </nav>
    );
}
