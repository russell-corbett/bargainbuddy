import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChartLine,
  faXmark,
  faExpand
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import LineChartComponent from "./LineChartComponent";
import Image from "next/image";
import WalmartLogo from "../../srcImages/Walmart-Logo.wine.png";
import BestBuyLogo from "../../srcImages/best-buy-logo.png";
import { setMaxListeners } from "events";

// Need this file to trust that this is the is the structure for DataPoint (defined in LineChartComponent)
export interface DataPoint {
  monthDay: string;
  bestBuy: number;
  walmart: number;
}

interface ProductItem {
  itemImg: string;
  currentBestPrice: number;
  name: string;
  modelNumber: string;
  currentStore: string;
}

interface Product {
  item: ProductItem;
}

interface ProductCardProps {
  product: Product;
  date_price_data: DataPoint[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  date_price_data,
}) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const [backContent, setBackContent] = useState<"wishlist" | "chart" | null>(
    null
  );
  const [isMaximized, setIsMaximized] = useState(false);
  const handleMaximizeClick = () => {
    setIsMaximized(true);
  };
  const handleWishlistClick = () => {
    setFlipped(true);
    setBackContent("wishlist");
  };

  const handlePriceTrendClick = () => {
    setFlipped(true);
    setBackContent("chart");
  };

  const handleCloseClick = () => {
    setFlipped(false);
    setBackContent(null);
    setIsMaximized(false);
  };

  const getStoreLogo = () => {
    // // Temporary implementation: always return BestBuyLogo
    // return BestBuyLogo;

    // Future implementation (when currentStore is available)
    if (product.item.currentStore === "walmart") {
      return WalmartLogo;
    } else if (product.item.currentStore === "BestBuy") {
      return BestBuyLogo;
    }
    return BestBuyLogo;
  };

  const storeLogo = getStoreLogo();

  return (
    <div
      className={`${styles.productCard} w-80 h-[450px] relative bg-slate-50 rounded-xl border-neutral-200 shadow-lg hover:scale-105 duration-300`}
    >
      <div className={`${styles.cardInner} ${flipped ? styles.flipped : ""}`}>
        {/* Front of Card */}
        <div className={`${styles.cardFront} flex flex-col`}>
          {/* Product Image */}
          <div className="h-40 w-full flex items-center justify-center bg-white">
            <img
              src={product.item.itemImg}
              alt={product.item.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="text-lg font-semibold text-gray-800">
                {product.item.name}
              </div>
              <div className="text-primary text-lg font-semibold">
                ${product.item.currentBestPrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                Model Number: {product.item.modelNumber}
              </div>
            </div>

            {/* Button Container */}
            <div className="flex justify-between items-center mt-4 rounded-full">
              {/* Store Logo */}
              {storeLogo && (
                <Image
                  src={storeLogo}
                  alt="Store Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-full"
                />
              )}

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  className="bg-secondary text-white flex items-center justify-center p-2 rounded-full w-10 h-10 hover:scale-105 transition-all duration-300"
                  onClick={handlePriceTrendClick}
                >
                  <FontAwesomeIcon icon={faChartLine} />
                </button>

                <button
                  className="bg-secondary text-white flex items-center justify-center p-2 rounded-full w-10 h-10 hover:scale-105 transition-all duration-300"
                  onClick={handleWishlistClick}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className={`${styles.cardBack} p-6 flex flex-col items-center justify-center`}
        >
          {backContent === "wishlist" && (
            <>
              <h2 className="text-xl font-semibold text-secondary mb-4">
                Added to Wishlist!
              </h2>
              <p className="text-gray-600 text-center">
                This item has been added to your wishlist.
              </p>
              <button
                className="mt-4 bg-secondary text-white flex items-center justify-center p-2 rounded-full w-10 h-10 hover:scale-105 transition-all duration-300 self-center"
                onClick={handleCloseClick}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </>
          )}

          {backContent === "chart" && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="w-3/4 h-3/4 flex items-center justify-center relative">
                <LineChartComponent data={date_price_data} />
                <button
                  className="absolute top-2 -right-4 bg-secondary text-white p-2 w-10 h-10 rounded-full hover:scale-105 transition-all duration-300"
                  onClick={handleMaximizeClick}
                >
                  <FontAwesomeIcon icon={faExpand} />
                </button>
                <button
                className="absolute -bottom-12 bg-secondary text-white flex items-center justify-center p-2 h-10 w-10 rounded-full w-10 h-10 hover:scale-105 transition-all duration-300 self-center"
                onClick={handleCloseClick}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay for Maximized Chart */}
      <Modal isOpen={isMaximized} onClose={handleCloseClick}>
        <LineChartComponent data={date_price_data} />
      </Modal>
    </div>
  );
};

export default ProductCard;
