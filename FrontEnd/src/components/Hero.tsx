import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ingredients.jpg";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const { user } = useAuth();

  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Fresh Nigerian ingredients"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center lg:text-left">
        <div className="max-w-3xl mx-auto lg:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Smart Nutrition, <span className="text-primary">Affordable</span> for Every Naira
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Plan your meals, discover recipes, and optimize nutrition on a budget.
            Get personalized meal suggestions with Nigerian ingredients that fit
            your financial goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {/* Conditional rendering for the "Get Started" button */}
            {user ? (
              // If the user is logged in, this button navigates them to the recipes page
              <Link to="/recipes">
                <Button size="lg" className="text-lg px-8 py-6">
                  Browse Recipes
                </Button>
              </Link>
            ) : (
              // If the user is not logged in, this button navigates them to the signup page
              <Link to="/auth/signup">
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
            )}

            <a href="#ai-chat">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;