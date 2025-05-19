import "styles.css";
import { useFoodContext } from "../context/FoodContext";


function FoodCard({ food }) {
  const { isFavorite, addFavorites, removeFromFavorites } = useFoodContext();
  const favorite = isFavorite(food.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(food.id);
    else addFavorites(food); // Pass full food object
  }

  return (
    <div className="food-card">
      <div className="food-card__image">
        <img src={food.image} alt={food.name} />
        <button className={`favorite${favorite ? ' active' : ''}`} onClick={onFavoriteClick}>
          
        </button>
      </div>
      <div className="food-card__content">
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <p>{food.price}</p>
      </div>
    </div>
  );
}

export default FoodCard;





