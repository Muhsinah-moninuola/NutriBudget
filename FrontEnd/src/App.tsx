// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";           // Landing page
import Recipes from "./pages/Recipes";       // All recipes listing
import RecipeDetails from "./pages/RecipeDetails"; // Single recipe details
import BudgetPlanner from "@/components/BudgetPlanner";
import NotFound from "./pages/NotFound";     // Catch-all 404

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Index />} />

          {/* Recipes listing page */}
          <Route path="/recipes" element={<Recipes />} />

          {/* Single recipe detail page */}
          <Route path="/recipes/:id" element={<RecipeDetails />} />

        
          {/* Premium page route */}
          <Route path="/premium" element={<BudgetPlanner />} />


          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
