import React from "react";
import ProductCard from "../Components/ProductCard";
import { Link } from "react-router-dom";

const ShopPage = () => {
  return (
    <div>
      <h1>Shop</h1>
      <div>
        <ProductCard />
      </div>
    </div>
  );
};

export default ShopPage;
