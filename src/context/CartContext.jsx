import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('checkoutCart')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
  }, [cart]);

  // Listen for changes to localStorage from other tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'checkoutCart') {
        try {
          setCart(JSON.parse(e.newValue) || []);
        } catch {
          setCart([]);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
