import recipesData from "@/data/recipes.json";
import { Recipe, Ingredient, ShoppingListItem } from "./types";

const recipes: Recipe[] = recipesData as Recipe[];

export function getAllRecipes(): Recipe[] {
  return recipes;
}

export function getRecipesByVegetables(vegetableIds: string[]): Recipe[] {
  if (vegetableIds.length === 0) return recipes;

  return recipes
    .map((recipe) => {
      const matchCount = recipe.vegetables.filter((v) =>
        vegetableIds.includes(v)
      ).length;
      return { recipe, matchCount };
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(({ recipe }) => recipe);
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function aggregateIngredients(
  selectedRecipes: { recipe: Recipe; servings: number }[]
): ShoppingListItem[] {
  const map = new Map<string, ShoppingListItem>();

  for (const { recipe, servings } of selectedRecipes) {
    const multiplier = servings / recipe.servings;
    for (const ing of recipe.ingredients) {
      const key = `${ing.name.toLowerCase()}-${ing.unit}`;
      const scaledQty = ing.quantity * multiplier;
      const recipeLabel = `${recipe.name} (${servings} people)`;
      const existing = map.get(key);
      if (existing) {
        existing.quantity += scaledQty;
        if (!existing.fromRecipes.includes(recipeLabel)) {
          existing.fromRecipes.push(recipeLabel);
        }
      } else {
        map.set(key, {
          ...ing,
          quantity: scaledQty,
          checked: false,
          fromRecipes: [recipeLabel],
        });
      }
    }
  }

  const items = Array.from(map.values());
  const categoryOrder = ["vegetable", "dairy", "spice", "pantry", "oil"];
  items.sort(
    (a, b) =>
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  );
  return items;
}
