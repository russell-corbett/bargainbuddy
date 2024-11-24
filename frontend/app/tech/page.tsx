"use client";

import React, { useEffect, useState } from "react";
import { getSocket } from "../socket";
import ProductCard from "../components/ProductCard/ProductCard";

interface Product {
  item: {
    id: string; 
    itemImg: string;
    currentBestPrice: number;
    name: string;
    modelNumber: string;
  };
}

interface userItemsResponse {
  statusCode: number;
  data: Product[] | { error: string };
}

interface PriceDataResponse {
  statusCode: number;
  productId: string;
  prices: any[];
}

export default function TechPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [priceData, setPriceData] = useState<{ [key: string]: any[] }>({}); // Store price data by product ID

  const socket = getSocket();

  useEffect(() => {
    // Fetch user items
    socket.emit("getUserItems", { email: "zrcoffey@mun.ca" });

    socket.on("userItemsResponse", (response: userItemsResponse) => {
      if (response.statusCode !== 200) {
        console.error(
          "Error fetching products:",
          (response.data as { error: string }).error
        );
      } else {
        const products = response.data as Product[];
        setProducts(products);

        // Fetch price data for each product
        products.forEach((product) => {
          socket.emit("getPrices", { id: product.item.id });
        });
      }
    });

    socket.on("newProductAdded", (newProduct: Product["item"]) => {
      setProducts((prevProducts) => {
        const exists = prevProducts.some(
          (product) => product.item.modelNumber === newProduct.modelNumber
        );
        if (exists) return prevProducts;
        return [...prevProducts, { item: newProduct }];
      });
    });

    // Listen for price data response
    socket.on("priceDataResponse", (response: PriceDataResponse) => {
      if (response.statusCode !== 201) {
        console.log(priceData);
        console.error(
          `Error fetching price data for product ID ${response.productId}:`,
          response
        );
      } else {
        setPriceData((prevData) => ({
          ...prevData,
          [response.productId]: response.prices,
        }));
      }
    });

    // Clean up socket listeners on unmount
    return () => {
      socket.off("userItemsResponse");
      socket.off("priceDataResponse");
    };
  }, [socket]);
  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="bg-white text-black dark:text-black text-4xl mt-1 font-serif border-b border-gray-200 pb-6">
        Technology
      </h1>
      {products.length > 0 ? (
        <div className="flex justify-center w-full mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-auto mx-auto">
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
