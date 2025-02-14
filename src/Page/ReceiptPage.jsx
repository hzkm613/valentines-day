import React from "react";
import products from "../data/products";
import { useLocation } from "react-router-dom";

const ReceiptPage = () => {
  const { state } = useLocation();
  const { quantities } = state || {}; // Destructure quantities from state

  // Calculate total price
  const totalPrice = Object.keys(quantities).reduce((total, id) => {
    if (quantities[id] > 0) {
      const product = products.find((p) => p.id === Number(id));
      const quantity = quantities[id];
      total += product.price * quantity;
    }
    return total;
  }, 0);

  return (
    <div>
      <h1>Receipt</h1>
      {quantities && Object.keys(quantities).length > 0 ? (
        <div>
          {/* Display the selected items */}
          {Object.keys(quantities).map((id) => {
            if (quantities[id] > 0) {
              const product = products.find((p) => p.id === Number(id));
              const quantity = quantities[id];

              return (
                <div key={id} className="mb-4">
                  <p className="font-semibold">{product.name}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <p>No items selected</p>
      )}

      {/* Display the overall total */}
      {totalPrice > 0 && (
        <div className="mt-6 font-bold">
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default ReceiptPage;
