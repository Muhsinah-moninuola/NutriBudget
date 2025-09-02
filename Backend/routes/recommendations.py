from flask import Blueprint, jsonify, request
from services.recommendation_service import RecommendationService
from services.auth_service import auth_required
import logging

logger = logging.getLogger(__name__)
recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/recommend', methods=['POST'])
@auth_required
def get_recommendations():
    """Get recipe recommendations based on user ingredients and budget."""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'Invalid request data',
                'message': 'Request body must contain JSON data'
            }), 400
        
        user_ingredients = data.get('ingredients', [])
        budget = data.get('budget')
        
        if not user_ingredients:
            return jsonify({
                'success': False,
                'error': 'Missing ingredients',
                'message': 'Please provide a list of available ingredients'
            }), 400
        
        # Get recommendations
        recommendations = RecommendationService.get_recipe_recommendations(
            user_ingredients, budget
        )
        
        response_data = {
            'success': True,
            'data': recommendations,
            'count': len(recommendations),
            'user_ingredients': user_ingredients,
            'message': f'Found {len(recommendations)} recipe recommendations'
        }
        
        if budget:
            response_data['budget'] = budget
            response_data['budget_formatted'] = f"₦{budget:,.0f}"
        
        return jsonify(response_data), 200
        
    except Exception as e:
        logger.error(f"Error getting recommendations: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to get recommendations',
            'message': str(e)
        }), 500

@recommendations_bp.route('/recommend/quick', methods=['GET'])
def get_quick_recommendations():
    """Get quick recipe recommendations without authentication (free tier)."""
    try:
        # Get query parameters
        ingredients_param = request.args.get('ingredients', '')
        budget_param = request.args.get('budget')
        
        if not ingredients_param:
            return jsonify({
                'success': False,
                'error': 'Missing ingredients parameter',
                'message': 'Please provide ingredients as a comma-separated list'
            }), 400
        
        user_ingredients = [ing.strip() for ing in ingredients_param.split(',')]
        budget = int(budget_param) if budget_param else None
        
        # Get limited recommendations for free tier
        recommendations = RecommendationService.get_recipe_recommendations(
            user_ingredients, budget
        )[:3]  # Limit to 3 for free tier
        
        return jsonify({
            'success': True,
            'data': recommendations,
            'count': len(recommendations),
            'message': f'Free tier: Showing top {len(recommendations)} recommendations',
            'upgrade_message': f'Upgrade to Premium (₦{500}/month) for unlimited recommendations and meal planning'
        }), 200
        
    except Exception as e:
        logger.error(f"Error getting quick recommendations: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to get recommendations',
            'message': str(e)
        }), 500