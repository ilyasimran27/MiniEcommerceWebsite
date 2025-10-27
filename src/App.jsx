import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ConfirmationProvider } from "./contexts/ConfirmationContext";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import { getCurrentUser } from "./services/authService";

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const location = useLocation();
  const showHeader = location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <div className="App">
      {showHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <ConfirmationProvider>
      <NotificationProvider>
        <CartProvider>
          <Router> 
            <AppContent />
          </Router>
        </CartProvider>
      </NotificationProvider>
    </ConfirmationProvider>
  );
}

export default App;