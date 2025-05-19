import "../Styles.css"
import { useFoodContext } from "../context/FoodContext"
import FoodCard from "../components/FoodCard"

function Favorites() {
  const { favorites } = useFoodContext()
  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h1>No Favorites Yet</h1>
        <p>Add some food items to your favorites list!</p>
      </div>
    )
  }
  return (
    <div className="favorites">
      <h1>Favorites</h1>
      <div className="favorites-list">
        {favorites.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  )
}

export default Favorites;