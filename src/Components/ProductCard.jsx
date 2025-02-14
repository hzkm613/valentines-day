import React from "react";
import products from "../data/products"; // Ensure to import the products data

const ProductCard = ({ quantities, setQuantities }) => {
  // Handle quantity changes
  const updateQuantity = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change), // Minimum quantity is 0
    }));
  };

  // Calculate total price
  const totalPrice = Object.keys(quantities).reduce((total, id) => {
    if (quantities[id] > 0) {
      const product = products.find((p) => p.id === Number(id));
      total += quantities[id] * product.price;
    }
    return total;
  }, 0);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center p-4 sm:p-6">
        {/* Product List */}
        <div className="bg-[#f9f8f5] p-4 sm:p-6 rounded-xl jetbrains-mono-normal">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 border-b last:border-none flex-wrap"
            >
              {/* Product Details */}
              <div className="flex-1 min-w-[120px] ml-3">
                <span className="jetbrains-mono-semibold text-lg block">
                  {product.name}
                </span>
              </div>

              {/* Product Price */}
              <span className="jetbrains-mono-normal text-sm">
                ${product.price.toFixed(2)}
              </span>

              {/* Quantity Controls */}
              <div className="flex justify-center items-center">
                <button
                  className="text-m ml-6 text-black cursor-pointer"
                  onClick={() => updateQuantity(product.id, -1)}
                  disabled={quantities[product.id] === 0}
                >
                  -
                </button>
                <span className="mx-3 text-sm">
                  {quantities[product.id] || 0}
                </span>
                <button
                  className="text-sm text-black cursor-pointer"
                  onClick={() => updateQuantity(product.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Items Summary*/}
        {/* <div className="bg-white shadow-md p-4 sm:p-6 mt-6 w-full max-w-md rounded-lg jetbrains-mono-normal">
          <h3 className="text-xl font-semibold mb-4">Selected Items</h3>
          <ul className="space-y-2">
            {Object.keys(quantities).map((id) => {
              if (quantities[id] > 0) {
                const product = products.find((p) => p.id === Number(id));
                return (
                  <li key={id} className="flex justify-between items-center">
                    <span className="text-m">{product.name}</span>
                    <span className="text-sm">
                      {quantities[id]} × ${product.price.toFixed(2)}
                    </span>
                  </li>
                );
              }
              return null;
            })}
          </ul>
          <div className="flex justify-between text-lg mt-6 jetbrains-mono-semibold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
