import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const createOrder = async (orderData) => {
  try {
    const orderRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      orderId: orderRef.id,
      message: "Order placed successfully!",
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: "Failed to place order. Please try again.",
    };
  }
};

export const validateCheckoutForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  }

  if (!formData.address.trim()) {
    errors.address = "Address is required";
  }

  if (!formData.city.trim()) {
    errors.city = "City is required";
  }

  if (!formData.zipCode.trim()) {
    errors.zipCode = "ZIP code is required";
  }

 
  if (!formData.cardNumber.trim()) {
    errors.cardNumber = "Card number is required";
  } else {
    const digitsOnly = formData.cardNumber.replace(/\s/g, "");
    if (!/^\d{16}$/.test(digitsOnly)) {
      errors.cardNumber = "Card number must be 16 digits";
    }
  }

  if (!formData.expiryDate.trim()) {
    errors.expiryDate = "Expiry date is required";
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
    errors.expiryDate = "Expiry date must be in MM/YY format";
  }

  if (!formData.cvv.trim()) {
    errors.cvv = "CVV is required";
  } else if (!/^\d{3,4}$/.test(formData.cvv)) {
    errors.cvv = "CVV must be 3 or 4 digits";
  }

  return errors;
};
