import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AISuggestion from "@/components/AISuggestion";
import BudgetPlanner from "@/components/BudgetPlanner";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { fetchRecipes } from "@/services/nutribudget";
import { useAuth } from "@/hooks/useAuth";

interface IndexProps {
  user: any;
}

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

const Index = ({ user }: IndexProps) => {
  const { user: authUser } = useAuth();
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
          servings: 1,
          cookTime: "30 mins",
          image: recipeImages[r.name] || recipeImages["default"],
          ingredients: r.ingredients,
          instructions: r.instructions,
          nutritionInfo: r.nutrition_info,
          cost_formatted: r.cost_formatted,
        }));
        setRecipes(mapped);
      })
      .catch((err) => console.error("Failed to fetch recipes:", err))
      .finally(() => setLoading(false));
  }, []);

  const displayedRecipes = authUser ? recipes : recipes.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main id="home">
        <Hero />
      </main>

      {/* Featured Recipes Section */}
      <section className="py-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Explore Our Recipes 🍲</h2>
          <p className="text-gray-600">
            Affordable, nutritious recipes within your budget
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading recipes...</p>
        ) : displayedRecipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {displayedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        )}

        {/* The new "View More" button logic */}
        {!authUser && recipes.length > 3 && (
          <div className="text-center mt-6">
            <Link to="/auth/signup">
              <button
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700"
              >
                View More Recipes (Log in)
              </button>
            </Link>
          </div>
        )}

        {authUser && (
          <div className="text-center mt-6">
            <Link to="/recipes">
              <button
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700"
              >
                Browse All Recipes
              </button>
            </Link>
          </div>
        )}

      </section>

      <section id="ai-chat">
        <AISuggestion />
      </section>

      <section id="budget-planner">
        <BudgetPlanner />
      </section>

      <Footer />
    </div>
  );
};

export default Index;