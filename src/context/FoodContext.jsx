import React, { useState, useEffect } from "react";
import "../../styles.css";
import { FoodContext } from "./FoodContext";

export function FoodProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(id) {
    return favorites.some((food) => food.id === id);
  }

  function addFavorites(food) {
    if (!isFavorite(food.id)) setFavorites((prev) => [...prev, food]);
  }

  function removeFromFavorites(id) {
    setFavorites((prev) => prev.filter((food) => food.id !== id));
  }

  return (
    <FoodContext.Provider value={{ favorites, isFavorite, addFavorites, removeFromFavorites }}>
      {children}
    </FoodContext.Provider>
  );
}