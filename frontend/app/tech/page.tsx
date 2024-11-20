"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard/ProductCard";

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
      <h1 className="bg-white text-black dark:text-black text-4xl mt-1 font-serif border-b border-gray-200 pb-6">
        Technology
      </h1>
      {products.length > 0 ? (
        <div className="flex justify-center w-full mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-auto mx-auto">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
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
    currentBestPrice: number;
    name: string;
    modelNumber: string;
  };
}
