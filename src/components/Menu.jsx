import React, { useEffect, useState } from "react";
import FoodCard from "../pages/FoodCard";
import { getItems } from "../services/api";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getItems()
      .then((data) => setItems(data.items || data))
      .catch((err) => setError("Failed to load menu"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="menu-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {items.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}
