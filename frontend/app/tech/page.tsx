"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsPage = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.post("localhost:3001/getUserItems", {
					// Add any necessary request body parameters here
				});
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className="grid grid-cols-3 gap-8 mt-12">
			{products.map((product) => (
				<div key={product.id} className="bg-stone-50 rounded-3xl border-2 border-neutral-200 p-4 relative">
					<img src={product.imageUrl} alt={product.name} className="w-full h-72 object-cover rounded-t-3xl" />
					<h2 className="text-black text-xl font-semibold mt-4">{product.name}</h2>
					<p className="text-lime-800 text-xl font-semibold">{product.price}</p>
					<p className="text-neutral-500">{product.storeName}</p>
				</div>
			))}
		</div>
	);
};

export default function TechPage() {
	return (
		<div className="bg-white min-h-screen p-8">
			{/* Page Heading */}
			<div className="mt-12 relative">
				<h1 className="text-black text-6xl font-newsreader">Tech</h1>
				<div className="absolute top-12 right-0 flex space-x-4">
					<button className="px-4 py-2 bg-lime-800 text-white rounded-2xl font-semibold">Default</button>
					<button className="px-4 py-2 border border-stone-300 text-black rounded-2xl font-semibold">A-Z</button>
					<button className="px-4 py-2 border border-stone-300 text-black rounded-2xl font-semibold">List view</button>
				</div>
			</div>

			{/* Product Cards */}
			<ProductsPage />
		</div>
	);
}
