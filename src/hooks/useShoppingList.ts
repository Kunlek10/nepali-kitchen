"use client";

import { useState, useEffect, useCallback } from "react";
import { Recipe, ShoppingListItem } from "@/lib/types";
import { aggregateIngredients } from "@/lib/recipes";

const STORAGE_KEY = "nepali-kitchen-shopping-list";
const CHECKED_KEY = "nepali-kitchen-checked-items";

const STAPLES = new Set([
  "tomato", "tomatoes", "onion", "onions", "green chili", "green chilis",
  "green chilli", "green chillis", "garlic", "ginger", "cilantro", "coriander",
  "fresh cilantro", "potato", "potatoes",
]);

interface RecipeEntry {
  recipe: Recipe;
  servings: number;
}

interface StoredData {
  entries: RecipeEntry[];
}

function loadEntries(): RecipeEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed: StoredData = JSON.parse(data);
    return parsed.entries || [];
  } catch {
    return [];
  }
}

function loadChecked(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const data = localStorage.getItem(CHECKED_KEY);
    if (!data) return new Set();
    return new Set(JSON.parse(data));
  } catch {
    return new Set();
  }
}

export function useShoppingList() {
  const [entries, setEntries] = useState<RecipeEntry[]>([]);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEntries(loadEntries());
    setChecked(loadChecked());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ entries }));
  }, [entries, loaded]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(CHECKED_KEY, JSON.stringify(Array.from(checked)));
  }, [checked, loaded]);

  const addRecipe = useCallback((recipe: Recipe, servings: number) => {
    setEntries((prev) => {
      if (prev.some((e) => e.recipe.slug === recipe.slug)) return prev;
      return [...prev, { recipe, servings }];
    });
  }, []);

  const removeRecipe = useCallback((slug: string) => {
    setEntries((prev) => prev.filter((e) => e.recipe.slug !== slug));
  }, []);

  const isRecipeAdded = useCallback(
    (slug: string) => entries.some((e) => e.recipe.slug === slug),
    [entries]
  );

  const toggleItem = useCallback((key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const clearList = useCallback(() => {
    setEntries([]);
    setChecked(new Set());
  }, []);

  const uncheckAll = useCallback(() => {
    setChecked(new Set());
  }, []);

  const recipes = entries.map((e) => e.recipe);

  const items: ShoppingListItem[] = aggregateIngredients(entries)
    .filter((item) => !STAPLES.has(item.name.toLowerCase()))
    .map((item) => ({
      ...item,
      checked: checked.has(`${item.name.toLowerCase()}-${item.unit}`),
    }));

  return {
    items,
    recipes,
    loaded,
    addRecipe,
    removeRecipe,
    isRecipeAdded,
    toggleItem,
    clearList,
    uncheckAll,
  };
}
