"use client";

import Link from "next/link";
import { useShoppingList } from "@/hooks/useShoppingList";

const categoryLabels: Record<string, string> = {
  vegetable: "Vegetables",
  spice: "Spices & Seasonings",
  dairy: "Dairy",
  pantry: "Pantry",
  oil: "Oil & Fats",
};

const categoryOrder = ["vegetable", "dairy"];

export default function ShoppingListPage() {
  const { items, recipes, loaded, toggleItem, clearList, uncheckAll, removeRecipe } =
    useShoppingList();

  if (!loaded) {
    return (
      <div className="text-center py-16 text-gray-400">Loading...</div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold text-deep-green mb-2">
          Your shopping list is empty
        </h1>
        <p className="text-gray-500 mb-6">
          Add recipes to build your shopping list
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-saffron text-white rounded-lg hover:bg-turmeric transition-colors"
        >
          Browse Recipes
        </Link>
      </div>
    );
  }

  const grouped = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof items>
  );

  const shownItems = items.filter((i) => ["vegetable", "dairy"].includes(i.category));
  const checkedCount = shownItems.filter((i) => i.checked).length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-deep-green">Shopping List</h1>
          <p className="text-gray-500 text-sm mt-1">
            {checkedCount} of {shownItems.length} items checked
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={uncheckAll}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
          >
            Uncheck All
          </button>
          <button
            onClick={clearList}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-lg"
          >
            Clear List
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Recipes in list
        </h2>
        <div className="flex flex-wrap gap-2">
          {recipes.map((r) => (
            <span
              key={r.slug}
              className="inline-flex items-center gap-1 bg-cream text-deep-green px-3 py-1 rounded-full text-sm"
            >
              {r.imageEmoji} {r.name}
              <button
                onClick={() => removeRecipe(r.slug)}
                className="ml-1 text-gray-400 hover:text-red-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {categoryOrder
          .filter((cat) => grouped[cat])
          .map((cat) => (
            <div key={cat}>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                {categoryLabels[cat]}
              </h3>
              <ul className="space-y-2">
                {grouped[cat].map((item) => {
                  const key = `${item.name.toLowerCase()}-${item.unit}`;
                  return (
                    <li
                      key={key}
                      className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(key)}
                        className="w-5 h-5 rounded border-gray-300 text-saffron focus:ring-saffron cursor-pointer"
                      />
                      <div className="flex-1">
                        <span
                          className={`font-medium ${
                            item.checked
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          {Number.isInteger(item.quantity)
                            ? item.quantity
                            : parseFloat(item.quantity.toFixed(1))}{" "}
                          {item.unit} {item.name}
                        </span>
                        {item.optional && (
                          <span className="text-gray-400 text-xs ml-2">
                            (optional)
                          </span>
                        )}
                        <div className="text-xs text-gray-400 mt-0.5">
                          From: {item.fromRecipes.join(", ")}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
