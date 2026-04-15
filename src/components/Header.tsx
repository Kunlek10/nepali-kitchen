"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MEAL_TYPES = [
  { label: "Breakfast", value: "breakfast", emoji: "🌅" },
  { label: "Lunch", value: "lunch", emoji: "☀️" },
  { label: "Dinner", value: "dinner", emoji: "🌙" },
];

export default function Header() {
  const pathname = usePathname();

  const navLink = (href: string, label: string, match: string) => {
    const active = pathname === match || pathname.startsWith(match + "?");
    return (
      <Link
        href={href}
        className={`relative pb-1 text-sm font-medium transition-colors ${
          active ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
        }`}
      >
        {label}
        {active && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
        )}
      </Link>
    );
  };

  const homeActive = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🏔️</span>
          <span className="font-bold text-neutral-900 tracking-tight text-lg">
            Nepali Kitchen
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          {/* Home with meal-type dropdown */}
          <div className="group relative">
            <Link
              href="/"
              className={`relative pb-1 text-sm font-medium transition-colors flex items-center gap-1 ${
                homeActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Home
              <svg className="w-3 h-3 mt-0.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {homeActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
              )}
            </Link>

            {/* Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 hidden group-hover:block">
              <div className="bg-white border border-neutral-200 rounded-xl shadow-card py-1.5 w-44">
                <p className="px-3 py-1 text-xs text-neutral-400 font-medium uppercase tracking-wide">
                  Browse by meal
                </p>
                {MEAL_TYPES.map(({ label, value, emoji }) => (
                  <Link
                    key={value}
                    href={`/recipes?mealType=${value}`}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                  >
                    <span>{emoji}</span>
                    {label}
                  </Link>
                ))}
                <div className="border-t border-neutral-100 mt-1.5 pt-1.5">
                  <Link
                    href="/recipes"
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                  >
                    <span>🍽️</span>
                    All Recipes
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {navLink("/recipes", "All Recipes", "/recipes")}
          {navLink("/shopping-list", "Shopping List", "/shopping-list")}
        </nav>
      </div>
    </header>
  );
}
