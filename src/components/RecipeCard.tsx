import Link from "next/link";
import { Recipe } from "@/lib/types";

interface Props {
  recipe: Recipe;
  matchedVegs?: string[];
}

export default function RecipeCard({ recipe, matchedVegs }: Props) {
  const spiceBadge = {
    mild: "bg-green-50 text-green-700",
    medium: "bg-orange-50 text-orange-700",
    hot: "bg-red-50 text-red-700",
  }[recipe.spiceLevel];

  const totalTime = recipe.prepTimeMinutes + recipe.cookingTimeMinutes;
  const perServingCalories = Math.round(recipe.nutritionalFacts.calories / recipe.servings);

  return (
    <Link
      href={`/recipe/${recipe.slug}`}
      className="group block bg-white rounded-2xl border border-neutral-200 hover:shadow-card transition-all duration-200 overflow-hidden"
    >
      {/* Image area */}
      <div className="bg-neutral-50 flex items-center justify-center h-44 text-6xl group-hover:bg-neutral-100 transition-colors">
        {recipe.imageEmoji}
      </div>

      <div className="p-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-neutral-900 text-base leading-snug flex-1">
            {recipe.name}
          </h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${spiceBadge}`}>
            {recipe.spiceLevel}
          </span>
        </div>

        <p className="text-neutral-500 text-sm line-clamp-2 mb-3">
          {recipe.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
          <span>{recipe.cuisine}</span>
          <span>{totalTime} min</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 pt-3 border-t border-neutral-100 text-xs">
          <span className="font-semibold text-neutral-900">{perServingCalories} cal</span>
          <span className="text-neutral-300">·</span>
          <span className="text-neutral-500">{(recipe.nutritionalFacts.protein / recipe.servings).toFixed(0)}g protein</span>
          <span className="text-neutral-300">·</span>
          <span className="text-neutral-500">Score {recipe.healthScore}/10</span>
        </div>

        {/* Matched vegs */}
        {matchedVegs && matchedVegs.length > 0 && (
          <div className="flex gap-1 flex-wrap mt-3">
            {recipe.vegetables
              .filter((v) => matchedVegs.includes(v))
              .slice(0, 4)
              .map((v) => (
                <span
                  key={v}
                  className="text-xs bg-brand-light text-brand px-2 py-0.5 rounded-full"
                >
                  {v}
                </span>
              ))}
          </div>
        )}
      </div>
    </Link>
  );
}
