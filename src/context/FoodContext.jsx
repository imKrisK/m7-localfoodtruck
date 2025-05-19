import React, { createContext, useContext, useState, useEffect } from "react";
import "../styles.css"

const FoodContext = createContext();

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
    if (!isFavorite(food.id)) {
      setFavorites((prev) => [...prev, food]);
    }
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

export function useFoodContext() {
  return useContext(FoodContext);
}

function FoodCard({ food }) {
  const { isFavorite, addFavorites, removeFromFavorites } = useFoodContext()
  const favorite = isFavorite(food.id)

  function onFavoriteClick(e) {
    e.preventDefault()
    if (favorite) removeFromFavorites(food.id)
    else addFavorites(food.id)
  }

  return (
    <div className="food-card">
      <div className="food-card__image">
        <img src={food.image} alt={food.name} />
        <button
          className={`localStorage.setItem('lastOrder', JSON.stringify({ items: cart, orderId })); }`}
          onClick={onFavoriteClick}
        >
          ♥
        </button>
      </div>
      <div className="food-card__content">
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <p>{food.price}</p>
      </div>
    </div>
  )
}