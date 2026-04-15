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
    <div className="mt-8">
      <h2 className="text-xl font-bold text-deep-green mb-4">Ingredients</h2>
      <IngredientList
        ingredients={ingredients}
        servingMultiplier={multiplier}
        originalServings={originalServings}
      />
    </div>
  );
}
