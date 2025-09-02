import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, DollarSign } from "lucide-react";
import { useState } from "react";

const AISuggestion = () => {
  const [ingredients, setIngredients] = useState("");
  const [budget, setBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAISuggestion = async () => {
    setIsLoading(true);
    // Placeholder for API call to POST /api/ai-swap
    setTimeout(() => {
      setIsLoading(false);
      // Mock response would be handled here
    }, 2000);
  };

  return (
    <section id="ai-suggestion" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI Smart Suggestions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us what ingredients you have and your budget. Our AI will suggest 
            the perfect recipes and smart ingredient swaps to maximize nutrition and savings.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-gradient-to-br from-card to-cream/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Get Personalized Recipe Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ingredients">Available Ingredients</Label>
                  <Textarea
                    id="ingredients"
                    placeholder="e.g., rice, tomatoes, onions, chicken, plantains..."
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (₦)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="budget"
                        type="number"
                        placeholder="1500"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAISuggestion}
                    disabled={isLoading || !ingredients.trim() || !budget}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Getting AI Suggestions...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Ask AI for Suggestions
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Placeholder for AI suggestions - will be populated by API */}
              <div id="ai-suggestions-results" className="mt-8 p-6 bg-accent/30 rounded-lg border-2 border-dashed border-accent">
                <p className="text-center text-muted-foreground">
                  AI suggestions will appear here after you submit your ingredients and budget.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AISuggestion;