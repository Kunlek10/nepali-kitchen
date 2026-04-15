export type MealType = "breakfast" | "lunch" | "dinner";

export interface Vegetable {
  id: string;
  name: string;
  nepaliName: string;
  emoji: string;
}
export type SpiceLevel = "mild" | "medium" | "hot";
export type IngredientCategory = "vegetable" | "dairy" | "spice" | "pantry" | "oil";

export interface NutritionalFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  category: IngredientCategory;
  optional?: boolean;
}

export interface Recipe {
  slug: string;
  name: string;
  description: string;
  cuisine: string;
  vegetables: string[];
  ingredients: Ingredient[];
  steps: string[];
  cookingTimeMinutes: number;
  prepTimeMinutes: number;
  servings: number;
  spiceLevel: SpiceLevel;
  tags: string[];
  imageEmoji: string;
  nutritionalFacts: NutritionalFacts;
  healthScore: number;
  mealType?: MealType;
}

export interface ShoppingListItem extends Ingredient {
  checked: boolean;
  fromRecipes: string[];
}
