```markdown
# NutriBudget AI Tools & Prompts

This README documents the AI tools used for **NutriBudget** and the exact prompts given for backend, frontend, and integration tasks.

---

## Table of Contents
- [AI Tools Used](#ai-tools-used)
- [Prompts](#prompts)
  - [OpenAI ChatGPT](#1-openai-chatgpt)
  - [Bolt (Backend)](#2-bolt-backend)
  - [Lovable (Frontend)](#3-lovable-frontend)

---

## AI Tools Used

- **OpenAI ChatGPT** – for debugging, deployment guidance, and connecting frontend to backend  
- **Bolt AI** – for backend development assistance  
- **Lovable AI** – for frontend design guidance  

---

## Prompts

### 1. OpenAI ChatGPT
**Purpose:** Debugging, deployment guide, and connecting frontend to backend.  

**Prompt:**
```

You are helping with a hackathon project called NutriBudget. Provide guidance for:

* Debugging the backend
* Deploying the app
* Connecting the frontend to the backend
* Offering suggestions for prompts to optimize the AI functionality

Focus on practical, hackathon-ready solutions without overcomplicating the setup.

```

---

### 2. Bolt (Backend)
**Prompt:**
```

Build a Flask backend for a hackathon project called NutriBudget. The backend should connect to a Supabase database and provide endpoints for ingredient-based recipe recommendations, weekly budget meal planning, AI nutrition insights, and premium feature management.

Database structure (Supabase):

ingredients: id (PK), name, category
recipes: id (PK), name, ingredients (text), nutrition\_info (text), instructions (text), category (Breakfast/Lunch/Dinner/Snack)
recipe\_ingredients: id (PK), recipe\_id (FK to recipes), ingredient\_id (FK to ingredients), quantity (text)
user\_ingredients: id (PK), user\_id (FK to profiles), ingredient\_id (FK to ingredients), quantity (optional)
profiles: id (UUID, PK), email, name, preferences

Requirements:

Use Supabase Auth for user registration/login; link logged-in users to profiles.
Connect securely to Supabase using environment variables (SUPABASE\_URL, SUPABASE\_KEY).

Endpoints:
GET /ingredients → return all ingredients in JSON.
GET /recipes → return all recipes with full details.
POST /recommend → takes a list of ingredient IDs and returns matching recipes (name, ingredients, nutrition\_info, instructions, category).
POST /budget-plan → takes a weekly budget and optionally user ingredients; returns a 7-day affordable meal plan using recipes (can use mocked ingredient costs for MVP).
POST /ai-swap → takes a recipe or ingredient list and returns affordable protein alternatives or nutrition tips using OpenAI API (mock AI responses if key not provided).
GET /premium-status → returns whether the user has unlocked premium features (stub for payment integration).

JSON responses for all endpoints.
/recommend should match recipes that use at least one of the provided ingredients.
Include error handling for missing or invalid data.
Code should be clean, well-commented, and ready to run for a hackathon MVP.

```

---

### 3. Lovable (Frontend)

**Initial Prompt:**
```

Frontend Design Prompt for NutriBudget

Objective:
Design a modern, inviting, and responsive landing page for NutriBudget, a web app that helps users plan meals with Nigerian ingredients based on their budget and nutrition goals. The theme should be cool, calm, and professional, focusing on food, nutrition, and affordability. Avoid flashy colors; lean on classy, muted, and appetizing tones (like warm neutrals, soft greens, and gentle creams).

Target Devices:

Desktop, tablet, and mobile (fully responsive).

Major Stacks:

HTML, CSS, JavaScript (vanilla).

No backend logic needed in design; placeholders for dynamic content are enough.

Page Structure

Header / Navbar

Logo on the left (“NutriBudget”) – simple, professional.

Navigation links: Home, Recipes, AI Suggestion, Budget Planner, Premium, Contact.

Optional: small login/signup button on the right.

Fixed or sticky navbar for better UX.

Hero Section (Landing Banner)

Inviting headline: “Smart Nutrition, Affordable for Every Naira.”

Subheadline: “Plan your meals, discover recipes, and optimize nutrition on a budget.”

Hero image: professional food imagery or illustration (warm and welcoming).

CTA button: “Get Started”.

Featured Recipes Section

Horizontal or grid layout with cards. Each card shows:

Recipe name

Category (Breakfast / Lunch / Dinner / Snack)

Estimated cost (placeholder: ₦\[cost])

Nutrition info (placeholder: High protein, fiber, etc.)

“View Details” button

Use soft shadows, rounded corners, and hover effects for interactivity.

AI Suggestion / Swap Corner

Floating or side panel on desktop; collapsible on mobile.

Input: list of ingredients from the user.

Button: “Ask AI”

Output area: AI-generated recipe suggestions (display as cards or list).

Should be clearly visible but subtle—does not overwhelm the page.

Budget Planner / Premium Section

Highlight free vs premium features.

Show CTA buttons for “Upgrade to Premium”.

Placeholders for meal plans or budget recommendations fetched dynamically from backend later.

Footer

Links: About, Privacy Policy, Contact

Social media icons (optional)

Small note: “Powered by NutriBudget – Smart nutrition planning with Nigerian Naira budgeting.”

UI / UX Style

Colors: warm neutrals, soft greens, gentle creams, muted oranges.

Typography: clean, modern sans-serif fonts, clear hierarchy.

Buttons: rounded corners, subtle shadows, hover animations.

Cards: soft drop shadows, slightly elevated, consistent spacing.

Responsiveness: mobile-first design; cards stack vertically on small screens.

Interactions: smooth transitions, clear hover states, clear CTA visibility.

Dynamic Content / API Placeholders

Recipes cards → fetch from GET /api/recipes

Placeholders: {name}, {category}, {estimated\_cost}, {nutrition\_info}

AI Suggestion → fetch from POST /api/ai-swap

Input: user-provided ingredients

Output: {suggestion} displayed in a friendly card/list format

Budget Planner → placeholder boxes for dynamic budget-based recommendations

Deliverable:
A fully responsive HTML/CSS/JS landing page prototype with:

Clean, professional design

Inviting food-related theme

Sections for recipes, AI suggestions, and premium features

Placeholders ready for backend integration

```

**Final Frontend Prompt:**
```
Objective:
Create a moderately styled, responsive web app frontend for NutriBudget. The app helps users plan meals with Nigerian ingredients based on budget and nutrition goals. The design should be cool, calm, and professional, using muted and appetizing tones (soft greens, warm neutrals, gentle creams). Avoid overly flashy colors or overly complex frameworks.

Requirements:

Technology: HTML, CSS, and plain JavaScript (vanilla). Do not use React, TypeScript, or extra frameworks.

Backend-ready: Include IDs, classes, or placeholders so dynamic content can be inserted later via API calls.

Responsiveness: Works on desktop, tablet, and mobile.

Page Structure:

Header / Navbar:

Logo on the left (“NutriBudget”), navigation links on the right: Home, Recipes, AI Suggestion, Budget Planner, Premium, Contact.

Optional login/signup button.

Sticky or fixed navbar for better UX.

Hero Section:

Headline: “Smart Nutrition, Affordable for Every Naira.”

Subheadline: “Plan your meals, discover recipes, and optimize nutrition on a budget.”

CTA button: “Get Started.”

Optional hero image or illustration.

Featured Recipes Section:

Grid layout with cards (recipe name, category, estimated cost, nutrition info, “View Details” button).

Use soft shadows, rounded corners, hover effects.

Include IDs or classes so backend can dynamically populate cards.

AI Suggestion / Swap Section:

Input for user ingredients, budget input, and “Ask AI” button.

Placeholder area to display AI-generated recipe suggestions.

Should be clearly visible but subtle, responsive on all devices.

Budget Planner / Premium Section:

Placeholder boxes for dynamic budget-based recommendations.

Highlight free vs premium features with CTA buttons.

Footer:

Links: About, Privacy Policy, Contact

Optional social media icons

Small note: “Powered by NutriBudget – Smart nutrition planning with Nigerian Naira budgeting.”

UI / UX Guidelines:

Rounded buttons, cards, and hover effects.

Modern sans-serif fonts, clear hierarchy.

Responsive: stack elements on mobile, grid on desktop.

Smooth transitions and interactions.

Dynamic Content / API Placeholders:

Recipe cards → populate dynamically via backend (GET /api/recipes).

AI Suggestion → placeholder for POST /api/ai-swap.

Budget Planner → placeholder boxes for API-driven content.

Deliverable:

Single-page responsive prototype with all sections in place.

Clean, professional styling, but not over-engineered.

Fully ready to connect to backend APIs later.

```


