import React from "react";
import products from "../data/products"; // Ensure to import the products data

const ProductCard = ({ quantities, setQuantities }) => {
  const updateQuantity = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change),
    }));
  };

  return (
    <div className="flex justify-center items-center w-full p-4">
      <div className="w-full max-w-[90%] sm:max-w-lg bg-[#f9f8f5] p-6 rounded-xl jetbrains-mono-normal">
        {/* Product List */}
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 border-b last:border-none w-full gap-3"
          >
            {/* Product Details */}
            <span className="text-[12px] sm:text-sm md:text-lg break-words whitespace-normal flex-1 min-w-0 jetbrains-mono-semibold">
              {product.name}
            </span>

            {/* Product Price */}
            <span className="text-[10px] sm:text-xs ml-10 md:text-sm">
              ${product.price.toFixed(2)}
            </span>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 ml-4">
              <button
                className="text-[10px] sm:text-xs md:text-sm text-black cursor-pointer disabled:opacity-50"
                onClick={() => updateQuantity(product.id, -1)}
                disabled={quantities[product.id] === 0}
              >
                -
              </button>
              <span className="text-[10px] sm:text-xs md:text-sm">
                {quantities[product.id] || 0}
              </span>
              <button
                className="text-[10px] sm:text-xs md:text-sm text-black cursor-pointer"
                onClick={() => updateQuantity(product.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
