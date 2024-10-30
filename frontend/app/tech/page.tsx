"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="min-h-screen p-8 bg-white">
      <h1 className="bg-white text-black dark:text-black text-6xl mt-12 font-['Newsreader']">
        Tech Products
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-3 gap-8 mt-12">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-black dark:text-black">
          No products found. Please submit a product link.
        </p>
      )}
    </div>
  );
}

interface Product {
  item: {
    itemImg: string;
    name: string;
    currentBestPrice: number;
    modelNumber: string;
  };
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="w-96 h-96 relative bg-stone-50 rounded-3xl border-2 border-neutral-200">
      {/* Product Image */}
      <img
        src={product.item.itemImg}
        alt={product.item.name}
        className="w-96 h-72 object-cover rounded-t-3xl absolute top-0 left-0"
      />
      {/* Product Name */}
      <h2 className="absolute left-6 top-[320px] text-black text-xl font-semibold font-['Inter'] leading-relaxed">
        {product.item.name}
      </h2>
      {/* Price */}
      <p className="absolute left-6 top-[350px] text-lime-800 text-xl font-semibold font-['Inter'] leading-relaxed">
        ${product.item.currentBestPrice}
      </p>
      {/* Model Number */}
      <p className="absolute left-6 top-[392px] text-neutral-500 text-base font-normal font-['Inter'] leading-normal">
        Model Number: {product.item.modelNumber}
      </p>
    </div>
  );
};
