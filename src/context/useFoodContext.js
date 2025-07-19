import { useContext } from "react";
import { FoodContext } from "./FoodContext";

export function useFoodContext() {
  return useContext(FoodContext);
}
