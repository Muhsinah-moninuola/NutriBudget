import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";

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

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/recipes");
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();
        setRecipes(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p className="text-center py-12">Loading recipes...</p>;
  if (error) return <p className="text-center py-12 text-red-600">{error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
    </div>
  );
};

export default Recipes;
