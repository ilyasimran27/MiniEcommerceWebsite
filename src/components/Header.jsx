import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, User } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { logoutUser, getCurrentUser } from "../services/authService";
import Logo from "../assets/logo.png";
import { useNotification } from "../contexts/NotificationContext";

const Header = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const { error } = useNotification();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate("/login");
    } else {
      error("Logout failed: " + result.error);
    }
  };

  return (
    <header className="bg-[#2563eb] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between h-[50px]">
          <Link to="/" className="flex items-center space-x-3 w-[20%]">
            <img
              src={Logo}
              alt="E-Commerce Logo"
              className="w-[100%] h-auto object-cover"
            />
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="flex items-center text-white">
                  <User className="w-4 h-4 mr-1" />
                  {user.email}
                </span>
                <Link
                  to="/cart"
                  className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({getTotalItems()})</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
