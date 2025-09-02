from flask import Blueprint, jsonify, request
from database import db
import logging

logger = logging.getLogger(__name__)
recipes_bp = Blueprint('recipes', __name__)

@recipes_bp.route('/recipes', methods=['GET'])
def get_all_recipes():
    """Get all available recipes."""
    try:
        recipes = db.get_all_recipes()

        # Format cost from database
        for recipe in recipes:
            estimated_cost = recipe.get('estimated_cost', 0)
            recipe['cost_formatted'] = f"₦{estimated_cost:,.0f}"

        return jsonify({
            'success': True,
            'data': recipes,
            'count': len(recipes),
            'message': f'Retrieved {len(recipes)} recipes successfully'
        }), 200

    except Exception as e:
        logger.error(f"Error fetching recipes: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch recipes',
            'message': str(e)
        }), 500

@recipes_bp.route('/recipes/category/<category>', methods=['GET'])
def get_recipes_by_category(category):
    """Get recipes filtered by category."""
    try:
        all_recipes = db.get_all_recipes()
        filtered_recipes = [
            recipe for recipe in all_recipes
            if recipe.get('category', '').lower() == category.lower()
        ]

        # Format cost for each recipe
        for recipe in filtered_recipes:
            estimated_cost = recipe.get('estimated_cost', 0)
            recipe['cost_formatted'] = f"₦{estimated_cost:,.0f}"

        return jsonify({
            'success': True,
            'data': filtered_recipes,
            'count': len(filtered_recipes),
            'category': category,
            'message': f'Retrieved {len(filtered_recipes)} {category} recipes'
        }), 200

    except Exception as e:
        logger.error(f"Error fetching recipes by category: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch recipes',
            'message': str(e)
        }), 500

@recipes_bp.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe_details(recipe_id):
    """Get detailed information about a specific recipe."""
    try:
        all_recipes = db.get_all_recipes()
        recipe = next((r for r in all_recipes if r['id'] == recipe_id), None)

        if not recipe:
            return jsonify({
                'success': False,
                'error': 'Recipe not found',
                'message': f'No recipe found with ID {recipe_id}'
            }), 404

        # Format cost
        estimated_cost = recipe.get('estimated_cost', 0)
        recipe['cost_formatted'] = f"₦{estimated_cost:,.0f}"

        # Get recipe ingredients with quantities
        recipe_ingredients = db.get_recipe_ingredients(recipe_id)

        return jsonify({
            'success': True,
            'data': {
                **recipe,
                'detailed_ingredients': recipe_ingredients
            },
            'message': 'Recipe details retrieved successfully'
        }), 200

    except Exception as e:
        logger.error(f"Error fetching recipe details: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch recipe details',
            'message': str(e)
        }), 500
