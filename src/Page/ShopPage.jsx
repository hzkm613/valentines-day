import React, { useState } from "react";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate("/receipt", {
      state: { selectedItems, quantities },
    });
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <h1 className="text-2xl jetbrains-mono-title">Please select items</h1>
      <div>
        <ProductCard
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          quantities={quantities}
          setQuantities={setQuantities}
        />
      </div>
      <button
        className="jetbrains-mono-semibold cursor-pointer"
        onClick={handleCheckOut}
      >
        Check out 💖
      </button>
    </div>
  );
};

export default ShopPage;
