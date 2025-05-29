import "styles.css";
import { useFoodContext } from "../context/FoodContext";
import { useCart } from '../context/CartContext';
import burgerImg from '../assets/burger.png';
import bbqPorkchopImg from '../assets/bbq-porkchop.png';
import burrito1Img from '../assets/burrito1.png';
import calburgerzoneImg from '../assets/calburgerzone.png';
import burritoImg from '../assets/burrito.png';
import spareRibsImg from '../assets/spare-ribs.png';
import chickenWingsImg from '../assets/chickenwings.png';
import fourLbsBurgerImg from '../assets/4lbsburger.png';
import comb3Img from '../assets/comb3.png';

const imageMap = {
  'burger.png': burgerImg,
  'bbq-porkchop.png': bbqPorkchopImg,
  'burrito1.png': burrito1Img,
  'calburgerzone.png': calburgerzoneImg,
  'burrito.png': burritoImg,
  'spare-ribs.png': spareRibsImg,
  'chickenwings.png': chickenWingsImg,
  '4lbsburger.png': fourLbsBurgerImg,
  'comb3.png': comb3Img,
};

function FoodCard({ food }) {
  const { isFavorite, addFavorites, removeFromFavorites } = useFoodContext();
  const favorite = isFavorite(food.id);
  const { cart, addToCart } = useCart();

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(food.id);
    else addFavorites(food); // Pass full food object
  }

  function onAddToCart() {
    // Use addToCart helper from context
    addToCart({
      id: food.id, // Ensure food has a unique id
      item: food.name,
      price: food.price
    }, 1);
  }

  return (
    <div className="food-card">
      <div className="food-card__image">
        <img src={imageMap[food.image] || burgerImg} alt={food.name} />
        <button className={`favorite${favorite ? ' active' : ''}`} onClick={onFavoriteClick}>
          
        </button>
      </div>
      <div className="food-card__content">
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <p>{food.price}</p>
        <button className="btn" onClick={onAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default FoodCard;





