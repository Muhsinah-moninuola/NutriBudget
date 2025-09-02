import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { fetchRecipes } from "@/services/nutribudget";

// Map images
const recipeImages: { [key: string]: string } = {
  "Egusi Soup and Pounded Yam": "/recipes/egusipounded-yam.jpg",
  "Jollof Rice": "/recipes/jollof.jpg",
  "Plantain and Beans Porridge": "/recipes/plantainandbeans.jpeg",
  "Placeholder": "/placeholder.svg", // points to public/placeholder.svg
};

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes()
      .then((res: any) => {
        const mapped = res.data.map((r: any) => ({
          id: r.id,
          name: r.name,
          category: r.category,
          estimatedCost: r.estimated_cost,
          servings: 1, // placeholder
          cookTime: "30 mins", // placeholder
          nutrition: { calories: 0, protein: 0 }, // placeholder
          image: recipeImages[r.name] || recipeImages["Placeholder"],
        }));
        setRecipes(mapped);
      })
      .catch((err) => console.error("Failed to fetch recipes:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="recipes" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Recipes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover delicious Nigerian recipes that fit your budget and nutrition goals.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRecipes;
