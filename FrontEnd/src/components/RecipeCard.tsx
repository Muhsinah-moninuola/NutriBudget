import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  name: string;
  category: string;
  estimatedCost: number;
  servings: number;
  nutritionInfo: string; // already backend-friendly string
  image?: string;
  cost_formatted: string;
}

const RecipeCard = ({
  id,
  name,
  category,
  servings,
  nutritionInfo,
  image,
  cost_formatted,
}: RecipeCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();

    // Get today's date
    const today = new Date().toDateString();

    // Retrieve stored views
    const stored = JSON.parse(localStorage.getItem("recipeViews") || '{}');
    let count = 0;

    if (stored.date === today) {
      count = stored.count || 0;
    }

    if (count >= 3) {
      // Redirect to premium page if limit exceeded
      alert("Free recipe views limit exceeded. Please upgrade to Premium!");
      navigate("/premium");
    } else {
      // Increment count and save with today's date
      localStorage.setItem(
        "recipeViews",
        JSON.stringify({ date: today, count: count + 1 })
      );
      // Navigate to recipe details page
      navigate(`/recipes/${id}`);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20 overflow-hidden">
      <div className="block cursor-pointer" onClick={handleViewDetails}>
        <div className="aspect-video overflow-hidden bg-muted">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/recipes/placeholder.jpeg";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-sage to-warm-neutral flex items-center justify-center">
              <span className="text-4xl">🍲</span>
            </div>
          )}
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="mb-2">
              {category}
            </Badge>
            <span className="text-sm font-semibold text-primary">
              {cost_formatted}
            </span>
          </div>
          <CardTitle className="text-lg leading-tight">{name}</CardTitle>
          <p className="text-xs text-muted-foreground">
            Click for details & preservation tips
          </p>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{servings} servings</span>
            </div>
          </div>

          {/* Nutrition Info Box */}
          <div className="bg-accent/50 rounded-lg p-3 text-center text-sm text-muted-foreground">
            <p className="font-medium text-accent-foreground">{nutritionInfo}</p>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default RecipeCard;
