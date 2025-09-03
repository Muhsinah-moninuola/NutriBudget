# NutriBudget – Smart Meal Recommender for Affordable Nutrition

### Live Site

* **Visit the Live Site:** [https://nutribudget.netlify.app](https://www.google.com/search?q=https://nutribudget.netlify.app)

## SDG Focus
**SDG 2 – Zero Hunger**: End hunger, achieve food security, and improve nutrition.

## Problem Statement
Rising inflation has made protein-rich foods increasingly expensive, forcing households to rely on cheaper, less nutritious alternatives. This has led to **hidden hunger**, where calorie needs may be met, but essential nutrients, such as protein and micronutrients, are lacking. Families need an affordable and practical way to plan meals that maximize nutrition using the ingredients they can access, without exceeding their budget.

**Key Question:**  
How can we help users discover affordable meal options that still meet their nutritional needs with the ingredients available to them?

## Proposed Solution
**NutriBudget** is a web application that helps households maximize nutrition per naira using AI and a food database.  

# NutriBudget: Affordable & Nutritious Recipe Planner

### About the Project

NutriBudget is a web application designed to help users discover and plan meals that are both nutritious and budget-friendly. The app features a wide range of recipes, with a focus on affordability. Users can browse recipes as guests, but can unlock the full library and premium features by creating an account.

The app uses a clean and responsive design to provide an excellent user experience on both desktop and mobile devices.

### Key Features

* **Guest Access:** Browse a curated selection of featured recipes without needing to log in.

* **User Authentication:** Secure signup and login for a personalized experience, built with Supabase.

* **Full Recipe Library:** Logged-in users can access the complete collection of recipes.

* **Recipe Details:** View detailed information for each recipe, including ingredients, instructions, and estimated cost.

* **Premium Features:** An in-app payment system powered by Paystack allows users to upgrade for premium content.

### Tech Stack

* **Frontend:** React, TypeScript, and Vite

* **Styling:** Tailwind CSS for a modern, utility-first design approach.

* **Authentication:** Supabase for secure user management.

* **Payment Gateway:** Paystack for handling premium upgrades.

* **Backend API:** An external REST API (hosted on Render) provides all the recipe data.

* **Deployment:** The application is continuously deployed with Netlify.

### Core Features
1. **Ingredient-based recipe recommender**
   - Users enter ingredients via checkboxes, search, or voice input.
   - App recommends affordable recipes that balance macronutrients, even with minimal protein.
   - Uses your recipe database + OpenAI API for creative text-based recipe suggestions.

2. **Meal Planning & Cost Estimation**
   - User enters weekly budget → system suggests a 7-day affordable plan.
   - Backend pulls average local market prices (mock prices possible for hackathon).

### Upcoming features

1. **Budget & Nutrition Score**
   - Recipes ranked by **“Nutrition per Naira”**:
     ```
     (Calories + Protein + Micronutrient density) ÷ Estimated cost
     ```
   - Data stored in Supabase (ingredients, recipes, cost, nutrition).

2. **Affordable Protein Alternatives**
   - AI suggests protein swaps (e.g., beans ↔ groundnut ↔ snail ↔ soy chunks).
   - LLM prompt engineering ensures cultural/local foods are prioritized.

3. **Nutrition Insights (AI)**
   - Users can ask: *“How can I add more protein to my beans porridge for less than ₦500?”*
   - AI explains swaps and tips (e.g., adding groundnut paste or dried crayfish).

## Monetization
1. **Freemium**: Free for basic recommendations; premium unlocks weekly meal planning + advanced nutrition insights  
2. **B2B**: Partner with NGOs, clinics, or school feeding programs for bulk nutrition planning  
3. **Ads/Marketplace**: Connect users with affordable protein vendors (local soy flour, beans, food vendors)  

## How It Works
1. User selects available ingredients and optionally sets a budget  
2. Flask saves the query into Supabase and fetches possible recipes  
3. Recipes ranked using a **nutrition-per-naira** score, balancing cost and nutritional value  
4. AI provides suggestions for:
   - Affordable protein alternatives (beans, soy chunks, groundnut paste)
   - Creative, realistic recipes using selected ingredients
   - Explanations on why a meal is affordable and nutritious

## Impact
- Helps families maximize nutrition under economic constraints  
- Reduces dependency on expensive proteins by suggesting affordable local substitutes  
- Provides a scalable, digital tool to promote nutrition awareness and better meal planning  
- Offers monetization potential through premium features (meal planning, vendor integration, or NGO partnerships)  


```
