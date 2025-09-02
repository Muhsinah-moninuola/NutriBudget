import { useState } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ingredients.jpg";
import { useAuth } from "@/hooks/useAuth"; // your Supabase auth hook

const Hero = () => {
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false); // toggle registration form

  // Quick signup handler
  const handleGetStarted = async () => {
    try {
      await signUp(email, password);
      alert("Registration successful! You are now logged in.");
      setShowForm(false);
      window.location.href = "/recipes"; // redirect to recipes page
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Scroll to AI suggestions section
  const handleLearnMore = () => {
    const section = document.getElementById("ai-chat");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

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
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => setShowForm(!showForm)}
            >
              Get Started
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </div>

          {/* Registration Form */}
          {showForm && (
            <div className="mt-6 p-6 bg-background/90 rounded-lg shadow-lg max-w-md mx-auto lg:mx-0">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300"
              />
              <Button className="w-full" onClick={handleGetStarted}>
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
