import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChartLine, faXmark } from "@fortawesome/free-solid-svg-icons";
import LineChartComponent from "./LineChartComponent";

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
}

interface Product {
	item: ProductItem;
}

interface ProductCardProps {
	product: Product;
	date_price_data: DataPoint[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, date_price_data }) => {
	const [flipped, setFlipped] = useState<boolean>(false);
	const [backContent, setBackContent] = useState<"wishlist" | "chart" | null>(null);

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
	};

	return (
		<div className={`${styles.productCard} w-80 h-[400px] relative bg-slate-50 rounded-xl border-neutral-200 shadow-lg hover:scale-105 duration-300`}>
			<div className={`${styles.cardInner} ${flipped ? styles.flipped : ""}`}>
				{/* Front of Card */}
				<div className={`${styles.cardFront} flex flex-col`}>
					{/* Product Image */}
					<div className="h-72 w-full overflow-hidden bg-white">
						<img src={product.item.itemImg} alt={product.item.name} className="w-full h-full object-contain" />
					</div>

					{/* Product Details */}
					<div className="p-4 flex-1 flex flex-col justify-between">
						<div>
							<div className="text-lg font-semibold text-gray-800">{product.item.name}</div>
							<div className="text-lime-800 text-lg font-semibold">${product.item.currentBestPrice.toFixed(2)}</div>
							<div className="text-sm text-gray-500">Model Number: {product.item.modelNumber}</div>
						</div>

						{/* Button Container */}
						<div className="flex justify-end mt-4 space-x-3">
							<button className="bg-lime-800 text-white flex items-center justify-center p-2 rounded-full w-10 h-10 hover:scale-105 transition-all duration-300" onClick={handlePriceTrendClick}>
								<FontAwesomeIcon icon={faChartLine} />
							</button>

							<button className="bg-lime-800 text-white flex items-center justify-center p-2 rounded-full w-10 h-10 hover:scale-105 transition-all duration-300" onClick={handleWishlistClick}>
								<FontAwesomeIcon icon={faPlus} />
							</button>
						</div>
					</div>
				</div>

				{/* Back of Card */}
				<div className={`${styles.cardBack} p-6 flex flex-col items-center justify-center`}>
					{backContent === "wishlist" && (
						<>
							<h2 className="text-xl font-semibold text-lime-800 mb-4">Added to Wishlist!</h2>
							<p className="text-gray-600 text-center">This item has been added to your wishlist.</p>
							<button className="mt-4 bg-lime-800 text-white flex items-center justify-center p-2 rounded-full w-10 h-10 hover:scale-105 transition-all duration-300 self-center" onClick={handleCloseClick}>
								<FontAwesomeIcon icon={faXmark} />
							</button>
						</>
					)}

					{backContent === "chart" && (
						<div className="w-full h-full flex flex-col">
							<div className="w-full flex-1">
								<LineChartComponent data={date_price_data} />
							</div>
							<button className="bg-lime-800 text-white flex items-center justify-center p-2 rounded-full w-10 h-10 hover:scale-105 transition-all duration-300 self-center" onClick={handleCloseClick}>
								<FontAwesomeIcon icon={faXmark} />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
