import React from "react";
import { useLocation } from "react-router-dom";
import products from "../data/products"; // Ensure to import the products data

const ReceiptPage = () => {
  const { state } = useLocation(); // Get the state passed from navigate
  const { selectedItems, quantities } = state || {}; // Destructure selectedItems and quantities

  // Calculate the total price of all selected items
  const totalPrice = Object.keys(selectedItems).reduce((total, id) => {
    if (selectedItems[id]) {
      const product = products.find((p) => p.id === Number(id));
      const quantity = quantities[id] || 1;
      total += product.price * quantity;
    }
    return total;
  }, 0);

  // Render the selected items in the receipt
  return (
    <div>
      <h1>Receipt</h1>
      {selectedItems && Object.keys(selectedItems).length > 0 ? (
        <div>
          {Object.keys(selectedItems).map((id) => {
            if (!selectedItems[id]) return null;

            // Find the product by ID
            const product = products.find((p) => p.id === Number(id));

            // If the product is found, display its name, quantity, and total price
            if (product) {
              const quantity = quantities[id] || 1;
              return (
                <div key={id} className="mb-4">
                  <p className="font-semibold">{product.name}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <p>Total: ${(product.price * quantity).toFixed(2)}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <p>No items selected</p>
      )}

      {/* Display the overall total of all selected items */}
      {totalPrice > 0 && (
        <div className="mt-6 font-bold">
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default ReceiptPage;
