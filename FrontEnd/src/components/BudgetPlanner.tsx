import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Star, Check, TrendingUp } from "lucide-react";
import PremiumButton from "./Premiumbutton";

const BudgetPlanner = () => {
  const budgetRecommendations = [
    { id: "budget-1", title: "Weekly Meal Plan", budget: 8500, savings: 2300, meals: 21, type: "free" },
    { id: "budget-2", title: "Monthly Family Plan", budget: 32000, savings: 8500, meals: 90, type: "premium" },
  ];

  const premiumFeatures = [
    "Advanced nutrition analytics",
    "Custom dietary restrictions",
    "Bulk buying recommendations",
    "Recipe scaling for families",
    "Shopping list optimization",
    "Price tracking & alerts",
  ];

  return (
    <section id="budget-planner" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Budget Planner</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Smart budget planning that adapts to your financial goals. Get personalized recommendations and track your savings.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Budget Plans */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" /> Your Budget Plans
            </h3>

            {budgetRecommendations.map((plan) => (
              <Card key={plan.id} className="border-0 bg-gradient-to-br from-card to-sage/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <Badge variant={plan.type === "premium" ? "default" : "secondary"}>
                      {plan.type === "premium" ? "Premium" : "Free"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">₦{plan.budget.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Budget</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">₦{plan.savings.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{plan.meals}</div>
                      <div className="text-xs text-muted-foreground">Meals</div>
                    </div>
                  </div>

                  {plan.type === "premium" ? (
                    <PremiumButton email="user@example.com" amount={2500} />
                  ) : (
                    <button className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                     onClick={() => alert("Coming Soon!")}>
                      View Plan Details
                    </button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Premium Features */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" /> Premium Features
            </h3>

            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" /> Unlock Advanced Planning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t">
                  <PremiumButton email="user@example.com" amount={2500} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetPlanner;
