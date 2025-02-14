import { Route, Routes } from "react-router-dom";
import StartPage from "./Page/StartPage";
import ShopPage from "./Page/ShopPage";
import ReceiptPage from "./Page/ReceiptPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/receipt" element={<ReceiptPage />} />
    </Routes>
  );
}

export default App;
