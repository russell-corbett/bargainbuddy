"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard/ProductCard";

export default function TechPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [priceData, setPriceData] = useState<{ [key: string]: any[] }>({}); // Store price data by product ID

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

      // Fetch price data for each product by its unique id
      try {
        for (const product of products) {
          const response = await axios.post("http://localhost:3001/getPrices", {
            id: product.item.id, // Use product's unique ID
          });

          // Check for BestBuy data in response and store it by product ID
          if (response.data.Prices) {
            setPriceData((prevData) => ({
              ...prevData,
              [product.item.id]: response.data.Prices, // Store date vs prices data by product ID
            }));
          }
        }
      } catch (error) {
        console.error("Error getting price data:", error);
      }
    };

    fetchProducts();
  }, [products]); // Add products to dependencies to ensure the API is called after they are fetched

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="bg-white text-black dark:text-black text-4xl mt-1 font-serif border-b border-gray-200 pb-6">
        Technology
      </h1>
      {products.length > 0 ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-8">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                date_price_data={priceData[product.item.id] || []} // Pass unique price data for each product
              />
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
    id: string; // Make sure there's an 'id' property for the product
    itemImg: string;
    currentBestPrice: number;
    name: string;
    modelNumber: string;
  };
}
