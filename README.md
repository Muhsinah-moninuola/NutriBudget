# NutriBudget – Smart Meal Recommender for Affordable Nutrition

### Live Site

* **Visit the Live Site:** [https://nutribudget.netlify.app](https://www.google.com/search?q=https://nutribudget.netlify.app)
---

This README provides a **technical deep dive** into the NutriBudget project, covering backend architecture, frontend structure, database design, AI integration, and deployment instructions.

---

### Project Architecture

NutriBudget is a **full-stack web application** designed to help users plan affordable, nutritious meals using Nigerian ingredients.

**High-level flow:**

1. User interacts with the **frontend** (ingredient input, budget, recipe exploration).

2. Requests are sent to the **RESTful backend API** hosted on Render.

3. Backend queries a **Supabase** database for ingredients, recipes, and user data.

4. Recipes are scored by **Nutrition-per-Naira** (calories, protein, micronutrients ÷ estimated cost).

5. AI (OpenAI) provides protein alternatives, recipe suggestions, and nutrition insights.

6. Results are returned to the frontend for display.

## Tech Stack

| Layer | Technology / Tools | 
 | ----- | ----- | 
| Frontend | React, TypeScript, Vite | 
| Styling | Tailwind CSS | 
| Backend | Python, Flask, REST API | 
| Database | Supabase (PostgreSQL + Auth) | 
| Authentication | Firebase | 
| Payment Gateway | Paystack | 
| AI | OpenAI API (GPT models) | 
| Deployment | Netlify (Frontend), Render (Backend) | 
| Dev Tools | Postman (API testing), Git/GitHub, VS Code | 

## Database Design

### Tables

**ingredients**

* `id` (PK)

* `name`

* `category`

**recipes**

* `id` (PK)

* `name`

* `ingredients` (text)

* `nutrition_info` (text)

* `instructions` (text)

* `category` (Breakfast/Lunch/Dinner/Snack)

**recipe_ingredients**

* `id` (PK)

* `recipe_id` (FK → recipes.id)

* `ingredient_id` (FK → ingredients.id)

* `quantity`

**user_ingredients**

* `id` (PK)

* `user_id` (FK → profiles.id)

* `ingredient_id`

* `quantity` (optional)

**profiles**

* `id` (UUID, PK)

* `email`

* `name`

* `preferences`

**Notes:**

* Indexed columns for quick lookup (e.g., ingredient name).

* Supabase Auth is used for registration/login.

## Backend API Endpoints

| Method | Endpoint | Description | 
 | ----- | ----- | ----- | 
| GET | `/ingredients` | Returns all ingredients in JSON | 
| GET | `/recipes` | Returns all recipes with details | 
| POST | `/recommend` | Accepts list of ingredient IDs, returns matching recipes | 
| POST | `/budget-plan` | Accepts weekly budget + optional user ingredients, returns 7-day plan | 
| POST | `/ai-swap` | Accepts recipe/ingredient list, returns AI-based protein swaps or nutrition tips | 
| GET | `/premium-status` | Returns user premium status (stub for payment integration) | 

**Backend Features:**

* JSON responses for all endpoints

* Error handling for missing/invalid data

* Nutrition-per-Naira scoring algorithm

* AI integration with OpenAI API

* Clean, modular, and hackathon-ready code

## AI Integration

* **OpenAI API**: Generates recipe suggestions, protein alternatives, and nutrition insights.

* **Integration points**:

  * `/ai-swap` endpoint

  * Budget-friendly protein swaps (e.g., beans ↔ groundnut ↔ snail ↔ soy chunks)

  * Tips for meal optimization within a set budget

* **Notes:** Can mock AI responses if API key is unavailable for MVP.

## Frontend Structure

* **Landing Page**:

  * Hero section with CTA

  * Recipe cards (dynamic placeholders)

  * AI Suggestion input/output

  * Budget planner and premium feature sections

  * Footer (About, Privacy Policy, Contact)

* **Templates Folder**:

  * `index.html`, `recipes.html`, `results.html`

* **Static Folder**:

  * `style.css`, `script.js`
**Frontend is ready for dynamic data injection** via backend API calls.

## Setup and Installation

To get this project up and running on your local machine, follow these steps.

#### 1. Clone the Repository

`git clone <https://github.com/Muhsinah-moninuola/NutriBudget>`
`cd NutriBudget`


#### 2. Install Dependencies

Install all the required npm packages.

`npm install`

#### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project. You will need to add the following environment variables, which are essential for connecting to the backend and the payment gateway.
```
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_d2d1f1495574245b1a0cf31960de9bb1096bc8d4
VITE_PUBLIC_API_URL = https://nutribudget.onrender.com/
```

**Note:** The `.env` file is intentionally ignored by Git for security reasons. Do not commit it to your repository.

#### 4. Run the Development Server

Start the local development server to view the app in your browser.

`npm run dev`

The app should now be running at `http://localhost:5173` (or a similar port).

## Security & Performance Considerations

* **Security**

  * Hash passwords with `bcrypt`

  * Parameterized queries / ORM to prevent SQL injection

  * API rate-limiting for AI calls

* **Performance**

  * Optional Redis or in-memory caching for recipe queries

  * Precompute nutrient scores on insert instead of per request
