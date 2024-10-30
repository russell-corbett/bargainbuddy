"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

export default function TechPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/getUserItems",
          {
            email: "zrcoffey@mun.ca",
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
	return (
		<div className="min-h-screen p-8 bg-white ">
			<h1 className="bg-white text-black dark:text-black text-4xl mt-1 font-serif border-b border-gray-200	 pb-6 ">Technology</h1>
			{products.length > 0 ? (
				<div className="grid grid-cols-3 gap-8 mt-6">
					{products.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
				</div>
			) : (
				<p className="text-black dark:text-black">No products found. Please submit a product link.</p>
			)}
		</div>
	);
}

interface Product {
	item: {
		itemImg: string;
		currentBestPrice: number;
		name: string;
		modelNumber: string;
	};
}

const ProductCard = ({ product }: { product: Product }) => {
	return (
	  <div className="w-96 h-[480px] relative bg-stone-50 rounded-3xl border-2 border-neutral-200 hover:scale-103 duration-300 shadow-lg hover:shadow-2xl ">
		
		{/* Product Image */}
		<div className="bg-white rounded-t-3xl w-full h-72">
			<img
			src={product.item.itemImg}
			alt={product.item.name}
			className="w-full h-72 object-contain rounded-t-3xl absolute top-0 left-0 hover:scale-103 duration-300"
			/>	
		</div>

		<div className="absolute left-6 top-[380px] text-lime-800 text-xl font-semibold font-['Inter'] leading-relaxed">
		  ${product.item.currentBestPrice}
		</div>

		{/* Product Name */}
		<div className="absolute left-4 top-[300px] text-black text-s font-semibold font-['Inter'] leading-relaxed 	">
		  {product.item.name}
		</div>

		{/* Model Number */}
		<div className="absolute left-6 top-[420px] text-neutral-500 text-base font-normal font-['Inter'] leading-normal">
		  Model Number: {product.item.modelNumber}
		</div>

		{/* Add to Wishlist Button */}
		<button
        className="bg-lime-800 text-white flex items-center justify-center p-2 rounded-full w-8 h-8 absolute bottom-4 right-4 hover:scale-105"
        onClick={() => console.log("Add to Cart clicked")} 
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>


		{/* Price Trend Button */}
		<button
        className="bg-lime-800 text-white flex items-center justify-center p-2 rounded-full w-8 h-8 absolute bottom-4 right-14 hover:scale-105"
        onClick={() => console.log("Price Trend Button Clicked")} 
      >
        <FontAwesomeIcon icon={faChartLine} />
      </button>


	  </div>
	);
  };
  