import React from "react";
import products from "../data/products";
import { useLocation } from "react-router-dom";
import Barcode from "react-barcode"; // Import the Barcode component
import paperImage from "../assets/img/paper.png";
import domtoimage from "dom-to-image";

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

  // Function to capture and save the receipt as an image
  const captureAndSave = () => {
    const receiptNode = document.getElementById("receipt");

    const style = document.createElement("style");
    style.innerHTML = `
      * {
        font-family: 'JetBrains Mono', monospace !important;
      }
    `;
    document.head.appendChild(style);

    domtoimage
      .toPng(receiptNode)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = `receipt_${orderNumber}.png`;
        link.href = dataUrl;
        link.click();
        document.head.removeChild(style);
      })
      .catch(function (error) {
        console.error("Error capturing the image:", error);
      });
  };

  // Generate random order number and other values
  const orderNumber = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit order number
  const cardNumber = "****" + Math.floor(Math.random() * 9000) + 1000; // Card number
  const authNumber = Math.floor(Math.random() * 9000000000000000); // Random 16-digit auth number
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Calculate total quantity
  const totalQuantity = Object.values(quantities).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return (
    <div className="flex flex-col justify-center items-center w-full h-full py-20">
      <div id="receipt" className="relative w-full h-auto max-w-[400px]">
        {/* Image stretches and fills available space */}
        <img
          className="absolute top-0 left-0 w-full h-full object-fill"
          src={paperImage}
          alt="paper background"
        />
        <div className="relative w-full h-full p-6 z-100">
          {/* Receipt Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-5 jetbrains-mono-title">
            Receipt
          </h1>
          <p className="text-sm sm:text-base jetbrains-mono-semibold">
            ORDER #{orderNumber} FOR '25Ohms'
          </p>
          <p className="text-sm sm:text-base jetbrains-mono-semibold">
            {currentDate.toLocaleDateString()} {currentTime}
          </p>
          <hr className="my-4" style={{ borderTop: "dashed 1px" }} />
          <hr className="my-4" style={{ borderTop: "dashed 1px" }} />

          {/* Display selected items */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <p className="text-sm sm:text-base jetbrains-mono-semibold">
                QTY
              </p>
              <p className="text-sm sm:text-base jetbrains-mono-semibold">
                ITEM
              </p>
              <p className="text-sm sm:text-base jetbrains-mono-semibold">
                AMT
              </p>
            </div>
            {Object.keys(quantities).map((id) => {
              if (quantities[id] > 0) {
                const product = products.find((p) => p.id === Number(id));
                const quantity = quantities[id];

                return (
                  <div key={id} className="flex justify-between mb-1">
                    <p className="text-xs sm:text-base jetbrains-mono-semibold">
                      {quantity}
                    </p>
                    <p className="text-xs sm:text-base jetbrains-mono-semibold">
                      {product.name.length > 13
                        ? product.name.slice(0, 13) + ".."
                        : product.name}
                    </p>
                    <p className="text-xs sm:text-base jetbrains-mono-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <hr className="my-4" style={{ borderTop: "dashed 1px" }} />

          {/* Display Invoice Summary */}
          <div className="mb-4">
            <p className="text-sm sm:text-base jetbrains-mono-semibold">
              ITEM COUNT: {totalQuantity}
            </p>
            <p className="text-sm sm:text-base jetbrains-mono-semibold">
              SUBTOTAL: ${totalPrice.toFixed(2)}
            </p>
            <p className="text-sm sm:text-base jetbrains-mono-semibold">
              DISCOUNT: ${totalPrice.toFixed(2)}
            </p>
            <p className="text-sm sm:text-base jetbrains-mono-semibold">
              TOTAL: ${totalPrice.toFixed(2) - totalPrice}
            </p>
          </div>

          <hr className="my-4" style={{ borderTop: "dashed 1px" }} />

          {/* Card Details */}
          <div>
            <p className="text-sm sm:text-base jetbrains-mono-semibold">
              CARD # : {cardNumber}
            </p>
            <p className="text-sm sm:text-base jetbrains-mono-semibold">
              AUTH: {authNumber}
            </p>
            <p className="text-sm sm:text-base jetbrains-mono-semibold">
              CARDHOLDER: 25ohms
            </p>
            <p className="text-sm sm:text-base jetbrains-mono-semibold">
              LABEL: VALENTINES DAY
            </p>
          </div>

          <hr className="my-4" style={{ borderTop: "dashed 1px" }} />

          {/* Display Barcode */}
          <div className="w-full">
            <div className="flex flex-row justify-center">
              <Barcode
                value={orderNumber.toString()}
                width={3} // More squares for barcode
                height={80}
                format="CODE128"
                displayValue={true}
                font="monospace"
                textAlign="center"
                textPosition="bottom"
                fontSize={12}
                background="transparent"
                lineColor="#000000"
                margin={5}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="mt-6 px-4 py-2 text-sm sm:text-lg jetbrains-mono-semibold cursor-pointer bg-black text-white rounded-lg"
        onClick={captureAndSave}
      >
        Save
      </button>
    </div>
  );
};

export default ReceiptPage;
