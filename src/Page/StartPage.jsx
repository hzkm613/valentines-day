import React from "react";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <div>
      <h1>Store Name</h1>

      <button>
        <Link to="/shop">Shop Now</Link>
      </button>
    </div>
  );
};

export default StartPage;
