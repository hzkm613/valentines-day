import { Route, Routes } from "react-router-dom";
import StartPage from "./Page/StartPage";
import ShopPage from "./Page/ShopPage";
import ReceiptPage from "./Page/ReceiptPage";

function App() {
  return (
    <div className="w-screen h-screen bg-[#ECECEC]">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
      </Routes>
    </div>
  );
}

export default App;
