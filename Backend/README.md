# NutriBudget Flask Backend

A smart nutrition planning backend API with Nigerian Naira budgeting and premium features.

## Features

### Free Tier
- Basic recipe recommendations
- Ingredient database access
- Simple nutrition tips
- Limited protein alternatives

### Premium Tier (₦500/month)
- 7-Day meal planning
- Unlimited recipe recommendations
- Advanced nutrition analysis
- Budget optimization tools

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables in `.env`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
FLASK_SECRET_KEY=your_secret_key
FLASK_ENV=development
```

3. Run the server:
```bash
python app.py
```

## API Endpoints

### Public Endpoints
- `GET /health` - Health check
- `GET /` - API information
- `GET /api/ingredients` - Get all ingredients
- `GET /api/recipes` - Get all recipes
- `POST /api/ai-swap` - Get protein alternatives
- `GET /api/premium/features` - Get premium features info

### Authenticated Endpoints
- `POST /api/recommend` - Get recipe recommendations
- `GET /api/premium-status` - Check premium status

### Premium Endpoints (Subscription Required)
- `POST /api/budget-plan` - Generate 7-day meal plan

## Database Schema

The backend connects to existing Supabase tables:
- `ingredients` - Available ingredients
- `recipes` - Recipe database
- `recipe_ingredients` - Recipe-ingredient relationships
- `user_ingredients` - User's available ingredients
- `profiles` - User profiles and preferences

## Authentication

Uses Supabase Auth with JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer your_jwt_token
```

## Error Handling

All endpoints return JSON responses with consistent error format:
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Monetization

- Currency: Nigerian Naira (₦)
- Premium subscription: ₦500/month
- Payment integration ready for Paystack/IntaSend
- Sponsored content for additional revenue