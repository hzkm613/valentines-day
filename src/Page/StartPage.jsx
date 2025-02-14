import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StartPage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Function to generate random positions within the screen
  const getRandomPosition = () => {
    const maxX = window.innerWidth - 100; // Approximate width of the text
    const maxY = window.innerHeight - 30; // Approximate height of the text

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    return { x: randomX, y: randomY };
  };

  // Initialize the position on first render or when page is refreshed
  useEffect(() => {
    const initialPosition = getRandomPosition();
    setPosition(initialPosition);
  }, []); // Empty dependency array to run this effect

  // Handle mouse enter to change position
  const handleMouseEnter = () => {
    setIsHovered(true);
    const newPosition = getRandomPosition();
    setPosition(newPosition);
  };

  // Handle click on "No"
  const handleClick = () => {
    alert("That is not an option");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold mb-6 jetbrains-mono-title">
        Would you be my valentine?
      </h1>
      <div className="flex flex-col">
        <Link to="/shop" className="inline-block jetbrains-mono-normal mb-2">
          &gt; Yes
        </Link>
        <span
          className="inline-block jetbrains-mono-normal"
          style={{
            position: isHovered ? "absolute" : "initial",
            left: `${position.x}px`,
            top: `${position.y}px`,
            transition: "all 0.2s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
        >
          &gt; No
        </span>
      </div>
    </div>
  );
};

export default StartPage;
