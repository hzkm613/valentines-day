import React, { useState } from "react";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleCheckOut = () => {
    // Pass the selectedItems and quantities to the ReceiptPage
    navigate("/receipt", {
      state: { selectedItems, quantities },
    });
  };

  return (
    <div>
      <h1>Shop</h1>
      <div>
        <ProductCard
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          quantities={quantities}
          setQuantities={setQuantities}
        />
      </div>
      <button onClick={handleCheckOut}>Check out</button>
    </div>
  );
};

export default ShopPage;
