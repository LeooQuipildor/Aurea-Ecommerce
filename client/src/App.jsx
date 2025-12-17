import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import { Toaster } from "sonner";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.2,
};

// Wrapper component for animated routes
const AnimatedRoute = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

// Component to handle animated routes
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rutas públicas con Navbar */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <AnimatedRoute>
                      <HomePage />
                    </AnimatedRoute>
                  }
                />
                <Route
                  path="/catalogo"
                  element={
                    <AnimatedRoute>
                      <CatalogPage />
                    </AnimatedRoute>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <AnimatedRoute>
                      <ProductPage />
                    </AnimatedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <AnimatedRoute>
                      <CartPage />
                    </AnimatedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <AnimatedRoute>
                      <CheckoutPage />
                    </AnimatedRoute>
                  }
                />
                <Route
                  path="/order-confirmation"
                  element={
                    <AnimatedRoute>
                      <OrderConfirmationPage />
                    </AnimatedRoute>
                  }
                />
                <Route
                  path="/contacto"
                  element={
                    <AnimatedRoute>
                      <ContactPage />
                    </AnimatedRoute>
                  }
                />
                {/* Ruta 404 para rutas públicas no encontradas */}
                <Route
                  path="*"
                  element={
                    <AnimatedRoute>
                      <NotFoundPage />
                    </AnimatedRoute>
                  }
                />
              </Routes>
            </div>
          }
        />

        {/* Rutas de administración */}
        <Route
          path="/admin/login"
          element={
            <AnimatedRoute>
              <AdminLogin />
            </AnimatedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin>
              <AnimatedRoute>
                <AdminDashboard />
              </AnimatedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requireAdmin>
              <AnimatedRoute>
                <AdminProducts />
              </AnimatedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <ProtectedRoute requireAdmin>
              <AnimatedRoute>
                <AdminProductForm />
              </AnimatedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute requireAdmin>
              <AnimatedRoute>
                <AdminProductForm />
              </AnimatedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute requireAdmin>
              <AnimatedRoute>
                <AdminOrders />
              </AnimatedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute requireAdmin>
              <AnimatedRoute>
                <AdminAnalytics />
              </AnimatedRoute>
            </ProtectedRoute>
          }
        />

        {/* Ruta 404 para rutas admin no encontradas */}
        <Route
          path="/admin/*"
          element={
            <AnimatedRoute>
              <NotFoundPage />
            </AnimatedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#F4C430",
              color: "#000",
              border: "1px solid #f3a51dff",
              borderRadius: "0px",
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
