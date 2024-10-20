"use client";

import { useProducts } from '../context/productContext_test';

export default function TechPage() {
    const { products } = useProducts();  // Get the products from the context

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-6xl mt-12" >Tech Products</h1>

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

const ProductCard = ({ product }) => {
    return (
        <div className="bg-stone-50 rounded-3xl border-2 border-neutral-200 p-4 relative">
            <img
                src={product.productPicture}  // Display product image
                alt={product.name}
                className="w-full h-72 object-cover rounded-t-3xl"
            />
            <h2 className="text-black text-xl font-semibold mt-4">{product.name}</h2>  // Product name
            <p className="text-lime-800 text-xl font-semibold">${product.price}</p>  // Product price
            <p className="text-gray-600">SKU: {product.sku}</p>  // SKU information
        </div>
    );
};
