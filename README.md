# NutriBudget – Smart Meal Recommender for Affordable Nutrition

## SDG Focus
**SDG 2 – Zero Hunger**: End hunger, achieve food security, and improve nutrition.

## Problem Statement
Rising inflation has made protein-rich foods increasingly expensive, forcing households to rely on cheaper, less nutritious alternatives. This has led to **hidden hunger**, where calorie needs may be met, but essential nutrients, such as protein and micronutrients, are lacking. Families need an affordable and practical way to plan meals that maximize nutrition using the ingredients they can access, without exceeding their budget.

**Key Question:**  
How can we help users discover affordable meal options that still meet their nutritional needs with the ingredients available to them?

## Proposed Solution
**NutriBudget** is a web application that helps households maximize nutrition per naira using AI and a food database.  

### Core Features
1. **Ingredient-based recipe recommender**
   - Users enter ingredients via checkboxes, search, or voice input.
   - App recommends affordable recipes that balance macronutrients, even with minimal protein.
   - Uses your recipe database + OpenAI API for creative text-based recipe suggestions.

2. **Budget & Nutrition Score**
   - Recipes ranked by **“Nutrition per Naira”**:
     ```
     (Calories + Protein + Micronutrient density) ÷ Estimated cost
     ```
   - Data stored in MySQL (ingredients, recipes, cost, nutrition).

3. **Affordable Protein Alternatives**
   - AI suggests protein swaps (e.g., beans ↔ groundnut ↔ snail ↔ soy chunks).
   - LLM prompt engineering ensures cultural/local foods are prioritized.

4. **Meal Planning & Cost Estimation**
   - User enters weekly budget → system suggests a 7-day affordable plan.
   - Backend pulls average local market prices (mock prices possible for hackathon).

5. **Nutrition Insights (AI)**
   - Users can ask: *“How can I add more protein to my beans porridge for less than ₦500?”*
   - AI explains swaps and tips (e.g., adding groundnut paste or dried crayfish).

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript (interactive ingredient-selection interface)  
- **Backend**: Python (Flask)  
  - API endpoints: `/ingredients`, `/recipes`, `/recommend`, `/budget-plan`  
- **Database**: MySQL  
  - Tables: `users`, `ingredients`, `recipes`, `nutrition_data`, `prices`  
  - Indexed for fast search/filter (e.g., `idx_ingredient_name`)  
- **AI Integration**: OpenAI API for text-based recipe suggestions, protein swaps, and nutrition insights  
- **Security & Fault Tolerance**:
  - Hash passwords with bcrypt
  - Rate-limit OpenAI API calls
  - Prevent SQL injection via ORM / parameterized queries
- **Performance**:
  - Cache recipe queries (Redis or in-memory dictionary)
  - Precompute nutrient scores on insert, not every request
- **Docs & Testing**:
  - README with architecture + ER diagram
  - Unit tests for scoring algorithm
  - Postman collection for API endpoints

## Monetization
1. **Freemium**: Free for basic recommendations; premium unlocks weekly meal planning + advanced nutrition insights  
2. **B2B**: Partner with NGOs, clinics, or school feeding programs for bulk nutrition planning  
3. **Ads/Marketplace**: Connect users with affordable protein vendors (local soy flour, beans, food vendors)  

## How It Works
1. User selects available ingredients and optionally sets a budget  
2. Flask saves the query into MySQL and fetches possible recipes  
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

## Project Structure
```
nutribudget/
│── app.py # Flask backend
│── requirements.txt # Flask, mysql-connector, openai
│── templates/
│ ├── index.html
│ ├── ingredients.html
│ └── results.html
│── static/
│ ├── style.css
│ └── script.js
│── db/
│ ├── schema.sql
│ └── seed.sql
```
