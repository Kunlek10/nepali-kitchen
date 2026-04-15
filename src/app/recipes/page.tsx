import { getRecipesByVegetables, getAllRecipes } from "@/lib/recipes";
import { vegetables } from "@/lib/vegetables";
import RecipeCard from "@/components/RecipeCard";
import Link from "next/link";
import { MealType } from "@/lib/types";

export default function RecipesPage({
  searchParams,
}: {
  searchParams: { vegs?: string; mealType?: string };
}) {
  const vegIds = searchParams.vegs
    ? searchParams.vegs.split(",").filter(Boolean)
    : [];

  const activeMealType = (searchParams.mealType ?? "all") as MealType | "all";

  let recipes =
    vegIds.length > 0 ? getRecipesByVegetables(vegIds) : getAllRecipes();

  if (activeMealType !== "all") {
    recipes = recipes.filter((r) => r.mealType === activeMealType);
  }

  const selectedVegs = vegIds
    .map((id) => vegetables.find((v) => v.id === id))
    .filter(Boolean);

  const mealLabel = activeMealType !== "all"
    ? activeMealType.charAt(0).toUpperCase() + activeMealType.slice(1)
    : null;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              {mealLabel
                ? `${mealLabel} Recipes`
                : vegIds.length > 0
                ? "Matching Recipes"
                : "All Recipes"}
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-neutral-600 underline hover:text-neutral-900"
          >
            ← Change vegetables
          </Link>
        </div>

        {/* Selected veg pills */}
        {selectedVegs.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {selectedVegs.map(
              (veg) =>
                veg && (
                  <span
                    key={veg.id}
                    className="inline-flex items-center gap-1 border border-neutral-200 text-neutral-700 px-3 py-1 rounded-full text-sm"
                  >
                    {veg.emoji} {veg.name}
                  </span>
                )
            )}
          </div>
        )}
      </div>

      {/* Recipe grid */}
      {recipes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🍽️</p>
          <p className="text-neutral-500 text-base mb-4">
            No recipes found for the selected filters.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-neutral-900 text-white text-sm font-semibold rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Try different vegetables
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.slug}
              recipe={recipe}
              matchedVegs={vegIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}
