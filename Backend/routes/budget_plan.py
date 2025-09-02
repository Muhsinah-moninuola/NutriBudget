from flask import Blueprint, jsonify, request
import services.budget_service as budget_service
from services.auth_service import auth_required, premium_required
from database import db
import logging

logger = logging.getLogger(__name__)
budget_plan_bp = Blueprint('budget_plan', __name__)

@budget_plan_bp.route('/budget-plan', methods=['POST'])
@auth_required
@premium_required
def generate_budget_plan():
    """Generate a 7-day meal plan based on weekly budget (Premium feature)."""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'Invalid request data',
                'message': 'Request body must contain JSON data'
            }), 400
        
        weekly_budget = data.get('weekly_budget')
        
        if not weekly_budget or weekly_budget <= 0:
            return jsonify({
                'success': False,
                'error': 'Invalid budget',
                'message': 'Please provide a valid weekly budget amount'
            }), 400
        
        # Get user's ingredients to personalize meal plan
        user_ingredients = []
        try:
            user_ingredient_data = db.get_user_ingredients(request.user_id)
            user_ingredients = [item['ingredient']['name'] for item in user_ingredient_data]
        except:
            pass  # Continue without user ingredients if not available
        
        # Generate meal plan
        meal_plan = budget_service.generate_weekly_meal_plan(
            weekly_budget, user_ingredients
        )
        
        return jsonify({
            'success': True,
            'data': meal_plan,
            'message': '7-day meal plan generated successfully',
            'feature': 'Premium'
        }), 200
        
    except Exception as e:
        logger.error(f"Error generating budget plan: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to generate meal plan',
            'message': str(e)
        }), 500

@budget_plan_bp.route('/budget-plan/preview', methods=['POST'])
@auth_required
def preview_budget_plan():
    """Preview what a budget plan would look like (limited version for non-premium users)."""
    try:
        data = request.get_json()
        weekly_budget = data.get('weekly_budget')
        
        if not weekly_budget or weekly_budget <= 0:
            return jsonify({
                'success': False,
                'error': 'Invalid budget',
                'message': 'Please provide a valid weekly budget amount'
            }), 400
        
        # Generate a sample 2-day preview
        daily_budget = weekly_budget / 7
        
        return jsonify({
            'success': True,
            'data': {
                'preview': True,
                'daily_budget': daily_budget,
                'daily_budget_formatted': f"₦{daily_budget:,.0f}",
                'sample_day': {
                    'breakfast': 'Rice and beans with plantain',
                    'lunch': 'Jollof rice with chicken',
                    'dinner': 'Yam porridge with vegetables',
                    'estimated_cost': daily_budget * 0.8
                },
                'full_plan_available': False
            },
            'message': 'Preview generated - upgrade to Premium for full 7-day meal plan',
            'upgrade_message': f'Upgrade to Premium (₦500/month) to unlock complete meal planning'
        }), 200
        
    except Exception as e:
        logger.error(f"Error generating budget plan preview: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to generate preview',
            'message': str(e)
        }), 500