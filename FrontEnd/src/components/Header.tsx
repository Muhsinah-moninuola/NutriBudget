import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="#home">
            <span className="text-2xl font-bold text-primary">NutriBudget</span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-8">
          <a className="text-sm font-medium text-foreground hover:text-primary transition-colors" href="#home">
            Home
          </a>
          <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#recipes">
            Recipes
          </a>
          <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#ai-chat">
            AI Chat
          </a>
          <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#budget-planner">
            Budget Planner
          </a>
          <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#premium">
            Premium
          </a>
          <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#contact">
            Contact
          </a>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            Login
          </Button>
          <Button size="sm">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col space-y-4 p-4">
            <a className="text-sm font-medium text-foreground hover:text-primary transition-colors" href="#home">
              Home
            </a>
            <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#recipes">
              Recipes
            </a>
            <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#ai-chat">
              AI Chat
            </a>
            <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#budget-planner">
              Budget Planner
            </a>
            <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#premium">
              Premium
            </a>
            <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#contact">
              Contact
            </a>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="ghost" size="sm">
                Login
              </Button>
              <Button size="sm">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
