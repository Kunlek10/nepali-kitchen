import { notFound } from "next/navigation";
import Link from "next/link";
import { getRecipeBySlug, getAllRecipes } from "@/lib/recipes";
import RecipeClientSection from "@/components/RecipeClientSection";
import CookingSteps from "@/components/CookingSteps";

export function generateStaticParams() {
  return getAllRecipes().map((r) => ({ slug: r.slug }));
}

export default function RecipeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) notFound();

  const spiceColor = {
    mild: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hot: "bg-red-100 text-red-800",
  }[recipe.spiceLevel];

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        href="/recipes"
        className="text-sm text-saffron hover:text-turmeric font-medium"
      >
        &larr; Back to recipes
      </Link>

      <div className="mt-4 bg-cream rounded-2xl flex items-center justify-center py-12 text-8xl">
        {recipe.imageEmoji}
      </div>

      <div className="mt-6">
        <div>
          <h1 className="text-3xl font-bold text-deep-green">{recipe.name}</h1>
          <p className="text-gray-500 mt-1">{recipe.description}</p>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            {recipe.cuisine}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${spiceColor}`}>
            {recipe.spiceLevel}
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            Prep: {recipe.prepTimeMinutes} min
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            Cook: {recipe.cookingTimeMinutes} min
          </span>
        </div>

        <div className="mt-8 grid md:grid-cols-[280px_1fr] gap-8 items-start">
          <div className="md:sticky md:top-20">
            <RecipeClientSection recipe={recipe} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-deep-green mb-4">Instructions</h2>
            <CookingSteps steps={recipe.steps} />
          </div>
        </div>
      </div>
    </div>
  );
}
