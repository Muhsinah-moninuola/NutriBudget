from flask import Blueprint, jsonify
from database import db
import logging

logger = logging.getLogger(__name__)
ingredients_bp = Blueprint('ingredients', __name__)

@ingredients_bp.route('/ingredients', methods=['GET'])
def get_all_ingredients():
    """Get all available ingredients."""
    try:
        ingredients = db.get_all_ingredients()
        
        return jsonify({
            'success': True,
            'data': ingredients,
            'count': len(ingredients),
            'message': f'Retrieved {len(ingredients)} ingredients successfully'
        }), 200
        
    except Exception as e:
        logger.error(f"Error fetching ingredients: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch ingredients',
            'message': str(e)
        }), 500

@ingredients_bp.route('/ingredients/categories', methods=['GET'])
def get_ingredient_categories():
    """Get all ingredient categories."""
    try:
        ingredients = db.get_all_ingredients()
        categories = list(set(ing['category'] for ing in ingredients if ing.get('category')))
        
        return jsonify({
            'success': True,
            'data': categories,
            'count': len(categories),
            'message': 'Retrieved ingredient categories successfully'
        }), 200
        
    except Exception as e:
        logger.error(f"Error fetching ingredient categories: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch ingredient categories',
            'message': str(e)
        }), 500