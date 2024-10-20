"use client";

import React, { useState, useEffect } from "react";
import { useProducts } from "../context/productContext_test";
import axios from "axios";

export default function Nav() {
	const [modelNumber, setModelNumber] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			const response = await axios.post("http://localhost:3001/createItem", {
				modelNumber: 
			});
		} catch (error) {
			console.error("Error sending products:", error);
		}
	};

	const handleSearchToggle = () => setIsSearchOpen(!isSearchOpen);

	return (
		<nav className="flex justify-between items-center p-4 bg-white border-b">
			<div className="text-lime-800 text-3xl font-['Newsreader']">Bargain Buddy</div>
			<div className="space-x-8">
				<a href="/profile" className="text-lime-800 font-['Newsreader'] hover:underline">
					My Profile
				</a>
				<a href="/groceries" className="text-lime-800 font-['Newsreader'] hover:underline">
					Groceries
				</a>
				<a href="/tech" className="text-lime-800 font-['Newsreader'] hover:underline">
					Technology
				</a>
				<a href="/settings" className="text-lime-800 font-['Newsreader'] hover:underline">
					Settings
				</a>
			</div>
			<button className="bg-lime-800 text-white px-4 py-2 rounded" onClick={handleSearchToggle}>
				Search
			</button>
			{isSearchOpen && (
				<div className="absolute top-0 left-0 w-full bg-gray-100 p-4 mt-2">
					<form onSubmit={handleSubmit} className="flex items-center space-x-4">
						<input type="text" value={modelNumber} onChange={(e) => setModelNumber(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" placeholder="Paste product link here..." />
						<button className="px-4 py-2 bg-lime-800 text-white rounded-lg">Add to Wishlist</button>
					</form>
				</div>
			)}
		</nav>
	);
}
