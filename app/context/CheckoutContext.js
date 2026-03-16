'use client'
import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({});

  return (
    <CheckoutContext.Provider
      value={{ cartItems, setCartItems, shippingInfo, setShippingInfo }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook
export const useCheckoutContext = () => useContext(CheckoutContext);