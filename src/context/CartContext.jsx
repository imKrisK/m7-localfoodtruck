import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('checkoutCart')) || [];
    } catch (err) {
      console.error('Failed to parse cart from localStorage', err);
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
        } catch (err) {
          console.error('Failed to sync cart from storage event', err);
          setCart([]);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Cart manipulation helpers
  const addToCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevCart, { ...item, quantity }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  }), [cart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
