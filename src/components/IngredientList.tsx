import { Ingredient } from "@/lib/types";

interface Props {
  ingredients: Ingredient[];
  servingMultiplier?: number;
  originalServings?: number;
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
  originalServings = 1,
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
    
    // Convert to fractions
    const multiplier = 16;
    const rounded = Math.round(quantity * multiplier) / multiplier;
    
    if (rounded === 0.5) return "½";
    if (rounded === 0.25) return "¼";
    if (rounded === 0.75) return "¾";
    if (rounded === 0.33) return "⅓";
    if (rounded === 0.67) return "⅔";
    
    return rounded.toFixed(2);
  };

  return (
    <div className="space-y-6">
      {sortedCategories.map((category) => (
        <div key={category}>
          <h3 className="text-sm font-bold text-deep-green mb-3 uppercase tracking-wide">
            {categoryLabels[category]}
          </h3>
          <ul className="space-y-2">
            {grouped[category].map((ingredient, idx) => {
              const adjustedQuantity = ingredient.quantity * servingMultiplier;
              const originalQuantity = ingredient.quantity;
              const showOriginal = servingMultiplier !== 1;

              return (
                <li
                  key={idx}
                  className="flex items-start justify-between gap-3 p-2 rounded-lg hover:bg-cream/50 transition-colors"
                >
                  <div>
                    <span className="text-gray-700">
                      {ingredient.name}
                      {ingredient.optional && (
                        <span className="text-xs text-gray-400 ml-1">
                          (optional)
                        </span>
                      )}
                    </span>
                    {showOriginal && (
                      <div className="text-xs text-gray-500 mt-1">
                        Original: {formatQuantity(originalQuantity)} {ingredient.unit}
                      </div>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="font-semibold text-deep-green whitespace-nowrap">
                      {formatQuantity(adjustedQuantity)} {ingredient.unit}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}