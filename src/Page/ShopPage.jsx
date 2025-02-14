import React, { useState, useCallback } from "react";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleSelectItem = useCallback((itemId, quantity) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
    setQuantities((prevState) => ({
      ...prevState,
      [itemId]: quantity,
    }));
  }, []);

  const handleCheckOut = () => {
    navigate("/receipt", {
      state: { selectedItems, quantities },
    });
  };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col items-center py-20">
      <h1 className="text-lg sm:text-2xl text-center jetbrains-mono-title mb-6">
        Please Select Items
      </h1>
      <div>
        <ProductCard
          selectedItems={selectedItems}
          setSelectedItems={handleSelectItem}
          quantities={quantities}
          setQuantities={setQuantities}
        />
      </div>
      <button
        className={`mt-6 px-4 py-2 text-sm sm:text-lg jetbrains-mono-semibold cursor-pointer bg-black text-white rounded-lg`}
        onClick={handleCheckOut}
      >
        Check out 💖
      </button>
    </div>
  );
};

export default ShopPage;
