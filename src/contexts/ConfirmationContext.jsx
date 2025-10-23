import React, { createContext, useContext, useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Info, X } from "lucide-react";

const ConfirmationContext = createContext();

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      "useConfirmation must be used within a ConfirmationProvider"
    );
  }
  return context;
};

export const ConfirmationProvider = ({ children }) => {
  const [dialog, setDialog] = useState(null);

  const confirm = (options) => {
    return new Promise((resolve) => {
      setDialog({
        ...options,
        onConfirm: () => {
          setDialog(null);
          resolve(true);
        },
        onCancel: () => {
          setDialog(null);
          resolve(false);
        },
      });
    });
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}

      {dialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                {dialog.type === "warning" && (
                  <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
                )}
                {dialog.type === "danger" && (
                  <XCircle className="w-6 h-6 text-red-500 mr-3" />
                )}
                {dialog.type === "success" && (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                )}
                {dialog.type === "info" && (
                  <Info className="w-6 h-6 text-blue-500 mr-3" />
                )}
                {!dialog.type && (
                  <AlertTriangle className="w-6 h-6 text-gray-500 mr-3" />
                )}

                <h3 className="text-lg font-semibold text-gray-900">
                  {dialog.title || "Confirmation"}
                </h3>
              </div>

              <button
                onClick={dialog.onCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600">{dialog.message}</p>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={dialog.onCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition-colors"
              >
                {dialog.cancelText || "Cancel"}
              </button>

              <button
                onClick={dialog.onConfirm}
                className={`px-4 py-2 text-white font-medium rounded-lg transition-colors ${
                  dialog.type === "danger"
                    ? "bg-red-500 hover:bg-red-600"
                    : dialog.type === "warning"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : dialog.type === "success"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-primary-500 hover:bg-primary-600"
                }`}
              >
                {dialog.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmationContext.Provider>
  );
};
