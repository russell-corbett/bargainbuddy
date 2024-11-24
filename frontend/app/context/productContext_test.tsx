import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

// Define the shape of the context
interface ProductContextType {
	products: any[];
	setProducts: Dispatch<SetStateAction<any[]>>;
}

// Create the product context
const ProductContext = createContext<ProductContextType | null>(null);

// Context provider to wrap around components needing product state
export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
	const [products, setProducts] = useState<any[]>([]);

	return <ProductContext.Provider value={{ products, setProducts }}>{children}</ProductContext.Provider>;
};

// Hook to access products context in components
export const useProducts = () => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error("useProducts must be used within a ProductsProvider");
	}
	return context;
};
