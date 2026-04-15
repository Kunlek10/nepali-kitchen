import { Ingredient } from "@/lib/types";

interface Props {
  ingredients: Ingredient[];
  servingMultiplier?: number;
}

const categoryLabels: Record<string, string> = {
  vegetable: "Vegetables",
  spice: "Spices & Seasonings",
  dairy: "Dairy",
  pantry: "Pantry",
  oil: "Oil & Fats",
};

const categoryOrder = ["vegetable", "dairy", "spice", "pantry", "oil"];

export default function IngredientList({
  ingredients,
  servingMultiplier = 1,
}: Props) {
  const grouped = ingredients.reduce(
    (acc, ing) => {
      if (!acc[ing.category]) acc[ing.category] = [];
      acc[ing.category].push(ing);
      return acc;
    },
    {} as Record<string, typeof ingredients>
  );

  const sortedCategories = Object.keys(grouped).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  const formatQuantity = (quantity: number): string => {
    if (quantity === 0) return "0";
    if (quantity % 1 === 0) return quantity.toString();
    const rounded = Math.round(quantity * 16) / 16;
    if (rounded === 0.5) return "½";
    if (rounded === 0.25) return "¼";
    if (rounded === 0.75) return "¾";
    if (rounded === 0.33) return "⅓";
    if (rounded === 0.67) return "⅔";
    return rounded.toFixed(1);
  };

  return (
    <div className="space-y-4">
      {sortedCategories.map((category) => (
        <div key={category}>
          <h3 className="text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">
            {categoryLabels[category]}
          </h3>
          <ul className="space-y-1">
            {grouped[category].map((ingredient, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between gap-2 py-1 border-b border-neutral-100 last:border-0"
              >
                <span className="text-xs text-gray-700">
                  {ingredient.name}
                  {ingredient.optional && (
                    <span className="text-gray-400 ml-1">(opt)</span>
                  )}
                </span>
                <span className="text-xs font-semibold text-deep-green whitespace-nowrap">
                  {formatQuantity(ingredient.quantity * servingMultiplier)} {ingredient.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
