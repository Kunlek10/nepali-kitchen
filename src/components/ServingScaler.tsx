import IngredientList from "./IngredientList";
import { Ingredient } from "@/lib/types";

interface Props {
  ingredients: Ingredient[];
  originalServings: number;
  servings: number;
}

export default function ServingScaler({ ingredients, originalServings, servings }: Props) {
  const multiplier = servings / originalServings;

  return (
    <IngredientList
      ingredients={ingredients}
      servingMultiplier={multiplier}
    />
  );
}
