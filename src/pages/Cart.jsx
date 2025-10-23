import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useConfirmation } from "../contexts/ConfirmationContext";
import { useNotification } from "../contexts/NotificationContext";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();
  const { success } = useNotification();
  const { confirm } = useConfirmation();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity === 0) {
      const confirmed = await confirm({
        title: "Remove Item",
        message: "Are you sure you want to remove this item from cart?",
        type: "warning",
        confirmText: "Remove",
        cancelText: "Keep",
      });

      if (confirmed) {
        removeFromCart(productId);
        success("Item removed from cart");
      }
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = async () => {
    const confirmed = await confirm({
      title: "Clear Cart",
      message:
        "Are you sure you want to clear all items from cart? This action cannot be undone.",
      type: "danger",
      confirmText: "Clear All",
      cancelText: "Cancel",
    });

    if (confirmed) {
      clearCart();
      success("Cart cleared successfully");
    }
  };
  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link
              to="/"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <div className="p-6 flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-primary-600 font-bold text-xl">
                    ${item.price}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Minus className="w-5 h-5" />
                  </button>

                  <span className="text-lg font-semibold w-8 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 mb-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleQuantityChange(item.id, 0)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-bold text-gray-900">Total:</span>
            <span className="text-3xl font-bold text-primary-600">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors text-center font-semibold"
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleCheckout}
              className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
