import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">NutriBudget</h3>
            <p className="text-sm text-muted-foreground">
              Smart nutrition planning with Nigerian Naira budgeting. 
              Helping you eat well while staying within budget.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#recipes" className="hover:text-primary transition-colors">Recipes</a></li>
              <li><a href="#ai-suggestion" className="hover:text-primary transition-colors">AI Suggestions</a></li>
              <li><a href="#budget-planner" className="hover:text-primary transition-colors">Budget Planner</a></li>
              <li><a href="#premium" className="hover:text-primary transition-colors">Premium</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contact" className="space-y-4">
            <h4 className="font-semibold">Get in Touch</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: hello@nutribudget.ng</p>
              <p>Phone: +234 706 900 1520</p>
              <div className="flex space-x-4 pt-2">
                <a 
                  href="https://www.linkedin.com/in/muhsinah-alaran-mnifst-188470215" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://x.com/Muhsinahh__" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors"
                >
                  Twitter
                </a>
                <a 
                  href="https://github.com/Muhsinah-moninuola" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors"
                >
                  Github
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 NutriBudget. All rights reserved.</p>
            <p>Powered by NutriBudget – Smart nutrition planning with Nigerian Naira budgeting.</p>
            <p>
              Built by <span className="font-medium">Muhsinah Alaran</span> – 
              <a href="muhsinahololade@gmail.com" className="hover:text-primary transition-colors"> Email Me</a>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
