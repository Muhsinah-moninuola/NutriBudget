import logging
from database import db
from config import Config

logger = logging.getLogger(__name__)

class RecommendationService:
    """Service for recipe recommendations and nutrition calculations."""

    # Nutrition values per 100g (calories, protein, carbs, fat)
    NUTRITION_DATA = {
        'rice': {'calories': 130, 'protein': 2.7, 'carbs': 28, 'fat': 0.3},
        'beans': {'calories': 347, 'protein': 21.6, 'carbs': 63, 'fat': 1.2},
        'chicken': {'calories': 239, 'protein': 27, 'carbs': 0, 'fat': 14},
        'fish': {'calories': 206, 'protein': 22, 'carbs': 0, 'fat': 12},
        'eggs': {'calories': 155, 'protein': 13, 'carbs': 1.1, 'fat': 11},
        'tomatoes': {'calories': 18, 'protein': 0.9, 'carbs': 3.9, 'fat': 0.2},
        'onions': {'calories': 40, 'protein': 1.1, 'carbs': 9.3, 'fat': 0.1},
        'oil': {'calories': 884, 'protein': 0, 'carbs': 0, 'fat': 100},
        'yam': {'calories': 118, 'protein': 1.5, 'carbs': 28, 'fat': 0.2},
        'plantain': {'calories': 122, 'protein': 1.3, 'carbs': 32, 'fat': 0.4}
    }

    @classmethod
    def calculate_nutrition_per_naira(cls, recipe):
        """
        Calculate nutrition value per naira for a recipe.
        Uses calories and protein from NUTRITION_DATA and cost from DB.
        """
        try:
            recipe_ingredients = recipe.get('ingredients', '')
            estimated_cost = recipe.get('estimated_cost', 1)  # avoid division by zero
            total_nutrition_score = 0

            ingredients_list = [ing.strip().lower() for ing in recipe_ingredients.split(',')]
            for ingredient in ingredients_list:
                nutrition_info = cls.NUTRITION_DATA.get(ingredient, {})
                if nutrition_info:
                    # simple nutrition score: protein * 2 + calories * 0.1
                    total_nutrition_score += nutrition_info.get('protein', 0) * 2
                    total_nutrition_score += nutrition_info.get('calories', 0) * 0.1

            return total_nutrition_score / estimated_cost

        except Exception as e:
            logger.error(f"Error calculating nutrition per naira: {str(e)}")
            return 0

    @classmethod
    def get_recipe_recommendations(cls, user_ingredients, budget=None):
        """
        Get recipe recommendations based on user ingredients and budget.
        Costs come from the database; nutrition from NUTRITION_DATA.
        """
        try:
            all_recipes = db.get_all_recipes()
            recommendations = []

            user_ingredient_names = [ing.lower() for ing in user_ingredients]

            for recipe in all_recipes:
                recipe_ingredients = recipe.get('ingredients', '').lower()

                # Count matching ingredients
                matches = sum(1 for ing in user_ingredient_names if ing in recipe_ingredients)
                match_percentage = (matches / len(user_ingredient_names)) * 100 if user_ingredient_names else 0

                # Nutrition per naira calculation
                nutrition_per_naira = cls.calculate_nutrition_per_naira(recipe)

                # Use DB cost
                estimated_cost = recipe.get('estimated_cost', 0)

                # Apply budget filter
                if budget and estimated_cost > budget:
                    continue

                recommendation = {
                    'id': recipe['id'],
                    'name': recipe['name'],
                    'category': recipe['category'],
                    'instructions': recipe['instructions'],
                    'nutrition_info': recipe['nutrition_info'],
                    'match_percentage': round(match_percentage, 1),
                    'nutrition_per_naira': round(nutrition_per_naira, 2),
                    'estimated_cost': estimated_cost,
                    'cost_formatted': f"{Config.CURRENCY_SYMBOL}{estimated_cost:,.0f}"
                }

                recommendations.append(recommendation)

            # Sort by nutrition_per_naira descending
            recommendations.sort(key=lambda x: x['nutrition_per_naira'], reverse=True)

            return recommendations[:10]  # return top 10

        except Exception as e:
            logger.error(f"Error getting recipe recommendations: {str(e)}")
            raise
