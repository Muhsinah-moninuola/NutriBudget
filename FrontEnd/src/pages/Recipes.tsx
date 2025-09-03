import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { fetchRecipes } from "@/services/nutribudget"; // <-- We are adding this import

interface Recipe {
  id: string;
  name: string;
  category: string;
  estimatedCost: number;
  servings: number;
  nutritionInfo: string;
  image?: string;
  cost_formatted: string;
}

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recipeImages: { [key: string]: string } = {
    "Efo Riro": "/recipes/egusipounded-yam.jpg",
    "Jollof Rice": "/recipes/jollof.jpg",
    "Plantain and Beans": "/recipes/plantainandbeans.jpeg",
    "Moi Moi": "/recipes/moimoi.jpeg",
    "Yam and Egg Sauce": "/recipes/yamandeggsauce.jpeg",
    "Fried Plantain": "/recipes/plantain.jpeg",
    "Indomie and Egg": "/recipes/indomie.jpeg",
    "Groundnut Soup with Rice": "/recipes/groundnutsoup.jpeg",
    "Ofada Rice with Sauce": "/recipes/ofada.jpeg",
    "default": "/recipes/placeholder.jpeg",
  };

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const res: any = await fetchRecipes();
        const mapped = res.data.map((r: any) => ({
          id: r.id,
          name: r.name,
          category: r.category,
          estimatedCost: r.estimated_cost,
          servings: 1, // placeholder
          cookTime: "30 mins", // placeholder
          image: recipeImages[r.name] || recipeImages["default"],
          ingredients: r.ingredients,
          instructions: r.instructions,
          nutritionInfo: r.nutrition_info,
          cost_formatted: r.cost_formatted,
        }));
        setRecipes(mapped);
      } catch (err: any) {
        console.error("Failed to fetch recipes:", err);
        setError("Failed to fetch recipes.");
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, []);

  if (loading) return <p className="text-center py-12">Loading recipes...</p>;
  if (error) return <p className="text-center py-12 text-red-600">{error}</p>;
  if (recipes.length === 0) return <p className="text-center py-12 text-gray-500">No recipes available.</p>;


  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
    </div>
  );
};

export default Recipes;