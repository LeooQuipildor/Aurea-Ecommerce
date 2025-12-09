import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Aquí definimos las rutas */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#fbbf24",
              color: "#000",
              border: "1px solid #f59e0b",
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
