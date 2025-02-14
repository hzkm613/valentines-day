import React from "react";
import products from "../data/products";

const ProductCard = ({
  selectedItems,
  setSelectedItems,
  quantities,
  setQuantities,
}) => {
  // Toggle item selection
  const toggleSelection = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] || 1, // Default quantity to 1 when selecting
    }));
  };

  // Handle quantity changes
  const updateQuantity = (id, change) => {
    if (!selectedItems[id]) return;
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  // Calculate total price
  const totalPrice = Object.keys(selectedItems).reduce((total, id) => {
    if (selectedItems[id]) {
      const product = products.find((p) => p.id === Number(id));
      total += (quantities[id] || 1) * product.price;
    }
    return total;
  }, 0);

  return (
    <div>
      <div className="flex flex-col items-center p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-handwritten mb-4">
          Please select items
        </h2>

        {/* Product List */}
        <div className="bg-gray-300 p-4 sm:p-6 rounded-lg w-full max-w-md">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 border-b last:border-none flex-wrap sm:flex-nowrap"
            >
              {/* Selectable Circle */}
              <div
                className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition ${
                  selectedItems[product.id]
                    ? "bg-black text-white"
                    : "bg-gray-500"
                }`}
                onClick={() => toggleSelection(product.id)}
              >
                {selectedItems[product.id] && "✔"}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-[120px] ml-2">
                <span className="text-lg font-handwritten block">
                  {product.name}
                </span>
              </div>

              {/* Product Price */}
              <span className="font-semibold text-sm sm:text-base">
                ${product.price.toFixed(2)}
              </span>

              {/* Quantity Controls */}
              <div className="flex items-center mt-2 sm:mt-0">
                <button
                  className={`px-2 text-xl ${
                    selectedItems[product.id] ? "text-black" : "text-gray-400"
                  }`}
                  onClick={() => updateQuantity(product.id, -1)}
                  disabled={!selectedItems[product.id]}
                >
                  -
                </button>
                <span className="mx-2 text-sm sm:text-base">
                  {selectedItems[product.id]
                    ? quantities[product.id] || 1
                    : "-"}
                </span>
                <button
                  className={`px-2 text-xl ${
                    selectedItems[product.id] ? "text-black" : "text-gray-400"
                  }`}
                  onClick={() => updateQuantity(product.id, 1)}
                  disabled={!selectedItems[product.id]}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Items Summary */}
        {Object.keys(selectedItems).some((id) => selectedItems[id]) && (
          <div className="bg-white shadow-md p-4 sm:p-6 mt-6 w-full max-w-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Selected Items</h3>
            <ul className="space-y-2">
              {Object.keys(selectedItems).map((id) => {
                if (!selectedItems[id]) return null;
                const product = products.find((p) => p.id === Number(id));
                return (
                  <li
                    key={id}
                    className="flex justify-between items-center border-b pb-2 last:border-none"
                  >
                    <span className="text-lg">{product.name}</span>
                    <span className="text-sm">
                      {quantities[id]} × ${product.price.toFixed(2)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
