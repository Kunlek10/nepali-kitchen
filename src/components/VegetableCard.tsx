import { Vegetable } from "@/lib/types";

interface Props {
  vegetable: Vegetable;
  selected: boolean;
  onToggle: (id: string) => void;
}

export default function VegetableCard({ vegetable, selected, onToggle }: Props) {
  return (
    <button
      onClick={() => onToggle(vegetable.id)}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-150 text-left w-full ${
        selected
          ? "border-neutral-900 bg-white shadow-card"
          : "border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-sm"
      }`}
    >
      <span className="text-3xl mb-2">{vegetable.emoji}</span>
      <span className={`font-medium text-sm ${selected ? "text-neutral-900" : "text-neutral-700"}`}>
        {vegetable.name}
      </span>
      <span className="text-xs text-neutral-500 mt-0.5">{vegetable.nepaliName}</span>
      {selected && (
        <span className="mt-2 w-2 h-2 rounded-full bg-neutral-900 inline-block" />
      )}
    </button>
  );
}
