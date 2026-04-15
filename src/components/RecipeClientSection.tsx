"use client";

import { useState } from "react";
import { Recipe } from "@/lib/types";
import { useShoppingList } from "@/hooks/useShoppingList";
import ServingScaler from "./ServingScaler";

interface Props {
  recipe: Recipe;
}

const MIN = 4;
const MAX = 6;

export default function RecipeClientSection({ recipe }: Props) {
  const [servings, setServings] = useState(5);
  const { addRecipe, removeRecipe, isRecipeAdded } = useShoppingList();
  const added = isRecipeAdded(recipe.slug);

  const handleShoppingList = () => {
    if (added) {
      removeRecipe(recipe.slug);
    } else {
      addRecipe(recipe, servings);
    }
  };

  return (
    <>
      {/* Serving scaler + shopping list button row */}
      <div className="flex items-center justify-between gap-4 flex-wrap mt-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Serves</span>
          <div className="flex items-center gap-2 bg-neutral-100 rounded-full px-1 py-1">
            <button
              onClick={() => setServings((s) => Math.max(MIN, s - 1))}
              disabled={servings <= MIN}
              className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-700 hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold text-lg leading-none"
            >
              −
            </button>
            <span className="w-4 text-center font-semibold text-neutral-900 text-sm">
              {servings}
            </span>
            <button
              onClick={() => setServings((s) => Math.min(MAX, s + 1))}
              disabled={servings >= MAX}
              className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-700 hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold text-lg leading-none"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleShoppingList}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            added
              ? "bg-deep-green text-white hover:bg-green-800"
              : "bg-saffron text-white hover:bg-turmeric"
          }`}
        >
          {added ? "✓ Added to Shopping List" : "Add to Shopping List"}
        </button>
      </div>

      {/* Ingredients scaled by servings */}
      <ServingScaler
        ingredients={recipe.ingredients}
        originalServings={recipe.servings}
        servings={servings}
      />
    </>
  );
}
