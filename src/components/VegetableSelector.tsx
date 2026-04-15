"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Vegetable } from "@/lib/types";
import VegetableCard from "./VegetableCard";

interface Props {
  vegetables: Vegetable[];
}

export default function VegetableSelector({ vegetables }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const findRecipes = () => {
    router.push(`/recipes?vegs=${selected.join(",")}`);
  };

  const clearAll = () => setSelected([]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {vegetables.map((veg) => (
          <VegetableCard
            key={veg.id}
            vegetable={veg}
            selected={selected.includes(veg.id)}
            onToggle={toggle}
          />
        ))}
      </div>

      {selected.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-card-hover p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <span className="text-sm text-neutral-500 shrink-0">
                {selected.length} selected
              </span>
              {selected.map((id) => {
                const veg = vegetables.find((v) => v.id === id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 bg-neutral-50 border border-neutral-200 text-neutral-700 px-3 py-1 rounded-full text-sm"
                  >
                    {veg?.emoji} {veg?.name}
                    <button
                      onClick={() => toggle(id)}
                      className="ml-1 text-neutral-400 hover:text-neutral-900 leading-none"
                    >
                      &times;
                    </button>
                  </span>
                );
              })}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={clearAll}
                className="text-sm font-medium text-neutral-600 underline hover:text-neutral-900"
              >
                Clear all
              </button>
              <button
                onClick={findRecipes}
                className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-semibold rounded-lg hover:bg-neutral-700 transition-colors"
              >
                Find Recipes ({selected.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
