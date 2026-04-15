# Nepali Kitchen — Project Description

## What It Is

A recipe discovery app for home-cooked Nepali meals. Pick the vegetables you have on hand and get matched with traditional recipes, complete with scaled ingredients and a smart shopping list.

---

## The Big Picture

Think of it like a restaurant menu app, but for home cooking. You pick what vegetables you have, it finds recipes, and you build a shopping list. Three main screens: **Home → Recipes → Recipe Detail**, plus a **Shopping List**.

---

## Tech Stack

- **Next.js** — the framework. Handles routing (URLs), pages, and server/client split
- **TypeScript** — JavaScript but with types, so you catch bugs before they happen
- **Tailwind CSS** — styling using class names directly in HTML instead of a separate CSS file
- **localStorage** — the browser's built-in mini-database, used to save your shopping list

---

## Folder Structure

```
src/
├── app/              ← pages (Next.js routes these automatically)
├── components/       ← reusable UI pieces
├── hooks/            ← shared logic
├── lib/              ← data + types
└── data/             ← recipes.json (103 recipes)
```

---

## The Data Layer (`src/lib/`)

This is the foundation everything else reads from.

**`types.ts`** — defines the shape of your data. Like a blueprint:
```typescript
interface Recipe {
  name: string;
  ingredients: Ingredient[];
  mealType: "breakfast" | "lunch" | "dinner";
  // ...
}
```
TypeScript enforces this everywhere. If a recipe is missing a field, the code won't compile.

**`recipes.ts`** — functions that read from `recipes.json`:
- `getAllRecipes()` — returns all 103 recipes
- `getRecipesByVegetables(ids)` — filters by selected veg
- `aggregateIngredients(entries)` — combines ingredients across multiple recipes and scales quantities by serving size

**`vegetables.ts`** — the list of 30+ vegetables with emoji and Nepali names

---

## Pages (`src/app/`)

Next.js turns folders into URLs automatically:

| Folder | URL | What it does |
|---|---|---|
| `app/page.tsx` | `/` | Home — vegetable selector |
| `app/recipes/page.tsx` | `/recipes` | Recipe grid with filters |
| `app/recipe/[slug]/page.tsx` | `/recipe/palak-paneer` | Single recipe detail |
| `app/shopping-list/page.tsx` | `/shopping-list` | Your shopping list |

The `[slug]` in brackets is a **dynamic route** — one file handles every recipe page, just with a different URL.

---

## Components (`src/components/`)

These are reusable UI blocks, like LEGO pieces:

**`Header.tsx`** — the sticky top nav with the hover dropdown. Uses `"use client"` because it needs `usePathname()` to know which page you're on and highlight the active link.

**`VegetableSelector.tsx`** — the grid of vegetable cards on the home page. Manages which vegs are selected and shows the sticky bottom bar when you've picked some. Client component because it has interactive state.

**`VegetableCard.tsx`** — a single vegetable button (emoji + name + Nepali name). Purely presentational — no logic, just receives props and renders.

**`RecipeCard.tsx`** — the recipe tile in the grid. Shows emoji, name, spice level, time, calories. Server component — no interactivity needed, just display.

**`RecipeClientSection.tsx`** — the interactive part of the recipe detail page. Holds the serving size state (4–6) and the "Add to Shopping List" button together, so they share the same number. This is the key design decision: both controls live here so when you add to the shopping list, it knows your chosen serving count.

**`ServingScaler.tsx`** — displays the ingredient list scaled to the chosen servings. Receives `servings` as a prop from `RecipeClientSection` and multiplies each ingredient quantity.

**`IngredientList.tsx`** — renders ingredients grouped by category (vegetables, dairy, etc.), with fractional quantities displayed as ½, ¼ etc.

**`CookingSteps.tsx`** — numbered list of cooking instructions.

---

## The Shopping List Hook (`src/hooks/useShoppingList.ts`)

A **hook** is a reusable piece of logic you can plug into any component. This one manages everything about the shopping list:

```
localStorage ←→ useShoppingList hook ←→ ShoppingList page
```

It stores `{ recipe, servings }` pairs — not just recipes. That way it remembers you added Palak Paneer for 6 people, and scales the ingredient quantities accordingly.

It also filters out staples you always have at home (garlic, onion, potato, cilantro, etc.) so you only see what you actually need to buy.

Shopping list only shows **Vegetables** and **Dairy** — spices, pantry items, and oils are excluded since those are assumed to be stocked at home.

---

## Server vs Client Components

This is the most important Next.js concept in this project:

- **Server components** (default) — run on the server, no interactivity. Faster, better for SEO. Example: `RecipeCard`, the recipes page.
- **Client components** (`"use client"` at top) — run in the browser, can use state and clicks. Example: `VegetableSelector`, `Header`, `RecipeClientSection`.

The rule followed: **keep things server components until you need interactivity**, then switch to client. This keeps the app fast.

---

## Data Flow for the Shopping List

```
User picks servings (5)
       ↓
RecipeClientSection holds state
       ↓
Clicks "Add to Shopping List"
       ↓
useShoppingList saves { recipe, servings: 5 } to localStorage
       ↓
Shopping list page reads entries
       ↓
aggregateIngredients() scales quantities × (5 / originalServings)
       ↓
Filters out staples (garlic, potato, onion, etc.)
       ↓
Shows only Vegetables + Dairy
```

---

## Key Design Decisions

- **URL-based filter state** — meal type and vegetable filters live in the URL (`/recipes?mealType=breakfast`), not in React state. This means filters survive page refreshes and are shareable as links.
- **Serving size shared between scaler and shopping list** — both controls live in `RecipeClientSection` so the serving count is always consistent.
- **Staples list** — hardcoded list of ingredients assumed to always be in the kitchen (tomato, onion, garlic, ginger, green chili, cilantro, potato). Never added to shopping list.
- **103 recipes** — 89 dinner, 9 lunch, 5 breakfast, stored as a flat JSON array in `src/data/recipes.json`.
