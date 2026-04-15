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
    <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200">
      {/* Header row: title + scaler */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-deep-green">Ingredients</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Serves</span>
          <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-full px-1 py-0.5">
            <button
              onClick={() => setServings((s) => Math.max(MIN, s - 1))}
              disabled={servings <= MIN}
              className="w-6 h-6 flex items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold text-base leading-none"
            >
              −
            </button>
            <span className="w-4 text-center font-semibold text-neutral-900 text-sm">
              {servings}
            </span>
            <button
              onClick={() => setServings((s) => Math.min(MAX, s + 1))}
              disabled={servings >= MAX}
              className="w-6 h-6 flex items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold text-base leading-none"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Ingredient list */}
      <ServingScaler
        ingredients={recipe.ingredients}
        originalServings={recipe.servings}
        servings={servings}
      />

      {/* Shopping list button */}
      <button
        onClick={handleShoppingList}
        className={`w-full mt-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
          added
            ? "bg-deep-green text-white hover:bg-green-800"
            : "bg-saffron text-white hover:bg-turmeric"
        }`}
      >
        {added ? "✓ Added to Shopping List" : "Add to Shopping List"}
      </button>
    </div>
  );
}
