import React from "react";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold mb-4 jetbrains-mono-title">
        Store Name
      </h1>
      <Link
        to="/shop"
        className="inline-block jetbrains-mono-normal hover:text-white transition duration-300 ease-in-out"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default StartPage;
