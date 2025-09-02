import { useParams } from "react-router-dom"
import preservationTips from "../data/preservationTips.json" // <-- your JSON file
import { Card, CardContent } from "@/components/ui/card"

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>() // grab recipe id from URL

  // Mock recipe for now
  const recipe = {
    id,
    name: "Concoction Rice",
    ingredients: ["Rice", "Palm oil", "Vegetables"],
    steps: ["Wash rice", "Cook with palm oil and spices", "Serve hot"],
  }

  // Try to match a preservation tip for any ingredient
  const matchedIngredient = recipe.ingredients.find((ing) =>
    preservationTips[ing.toLowerCase() as keyof typeof preservationTips]
  )

  const tip =
    matchedIngredient &&
    preservationTips[matchedIngredient.toLowerCase() as keyof typeof preservationTips]

  return (
    <div className="p-6">
      <Card className="shadow-lg rounded-2xl p-4">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>

          <h2 className="text-xl font-semibold">Ingredients</h2>
          <ul className="list-disc list-inside mb-4">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold">Steps</h2>
          <ol className="list-decimal list-inside mb-4">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          {tip && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h2 className="text-xl font-semibold">Preservation Tip</h2>
              <p>{tip}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default RecipeDetails
