import "../../styles.css";
import { useFoodContext } from "../context/useFoodContext";
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
  const favorite = isFavorite(food._id);
  const { addToCart } = useCart();

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(food._id);
    else addFavorites(food);
  }

  function onAddToCart() {
    addToCart({
      id: food._id,
      item: food.name,
      price: food.price
    }, 1);
  }
  return (
    <div className="food-card">
      <div className="Food-poster">
        <img src={imageMap[food.image] || burgerImg} alt={food.name} />
        <div className="Food-overlay">
          <button
            className={`favorite-btn${favorite ? ' active' : ''}`}
            onClick={onFavoriteClick}
            aria-pressed={favorite}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
            style={{ alignSelf: 'flex-end' }}
          >
            <i className={favorite ? 'fas fa-heart active' : 'far fa-heart'} aria-hidden="true"></i>
          </button>
          <div style={{ color: '#fff', marginTop: 'auto' }}>
            <h3 style={{ margin: 0 }}>{food.name}</h3>
            <p style={{ margin: '4px 0 8px 0', fontSize: '1em' }}>{food.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>${food.price}</span>
              <button className="add-to-cart" onClick={onAddToCart} style={{ marginLeft: 8 }}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;





