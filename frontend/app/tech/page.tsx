"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TechPage() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.post("http://localhost:3001/getUserItems", {
					email: "zrcoffey@mun.ca",
				});
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className="min-h-screen p-8">
			<h1 className="text-6xl mt-12">Tech Products</h1>
			{products.length > 0 ? (
				<div className="grid grid-cols-3 gap-8 mt-12">
					{products.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
				</div>
			) : (
				<p>No products found. Please submit a product link.</p>
			)}
		</div>
	);
}

interface Product {
	item: {
		itemImg: string;
		name: string;
		price: number;
		modelNumber: string;
	};
}

const ProductCard = ({ product }: { product: Product }) => {
	console.log(product);
	return (
		<div className="bg-stone-50 rounded-3xl border-2 border-neutral-200 p-4 relative">
			<img
				src={product.item.itemImg} // Display product image
				alt={product.item.name}
				className="w-full h-72 object-cover rounded-t-3xl"
			/>
			<h2 className="text-black text-xl font-semibold mt-4">{product.item.name}</h2> // Product name
			<p className="text-lime-800 text-xl font-semibold">${product.item.price}</p> // Product price
			<p className="text-gray-600">SKU: {product.item.modelNumber}</p> // SKU information
		</div>
	);
};
