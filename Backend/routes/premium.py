from flask import Blueprint, jsonify, request
from services.auth_service import auth_required, AuthService
from config import Config
import logging

logger = logging.getLogger(__name__)
premium_bp = Blueprint('premium', __name__)

@premium_bp.route('/premium-status', methods=['GET'])
@auth_required
def check_premium_status():
    """Check if the user has a premium subscription."""
    try:
        user_id = request.user_id
        is_premium = AuthService.is_premium_user(user_id)
        
        return jsonify({
            'success': True,
            'data': {
                'is_premium': is_premium,
                'user_id': user_id,
                'premium_price': Config.PREMIUM_MONTHLY_PRICE,
                'currency': Config.CURRENCY,
                'premium_features': [
                    '7-Day Meal Planning',
                    'Unlimited Recipe Recommendations',
                    'Advanced Nutrition Analysis',
                    'Shopping List Generator',
                    'Priority Customer Support'
                ],
                'price_formatted': f"{Config.CURRENCY_SYMBOL}{Config.PREMIUM_MONTHLY_PRICE}/month"
            },
            'message': 'Premium status checked successfully'
        }), 200
        
    except Exception as e:
        logger.error(f"Error checking premium status: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to check premium status',
            'message': str(e)
        }), 500

@premium_bp.route('/premium/upgrade', methods=['POST'])
@auth_required
def initiate_premium_upgrade():
    """Initiate premium subscription upgrade process."""
    try:
        # This endpoint would typically integrate with payment providers
        # like Paystack or IntaSend for actual payment processing
        
        return jsonify({
            'success': True,
            'data': {
                'upgrade_url': 'https://payment-provider.com/upgrade',  # Would be actual payment URL
                'amount': Config.PREMIUM_MONTHLY_PRICE,
                'currency': Config.CURRENCY,
                'description': 'NutriBudget Premium Subscription',
                'payment_methods': ['Card', 'Bank Transfer', 'USSD'],
                'message': 'Redirecting to payment provider...'
            },
            'message': 'Premium upgrade initiated'
        }), 200
        
    except Exception as e:
        logger.error(f"Error initiating premium upgrade: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to initiate upgrade',
            'message': str(e)
        }), 500

@premium_bp.route('/premium/features', methods=['GET'])
def get_premium_features():
    """Get information about premium features and pricing."""
    try:
        return jsonify({
            'success': True,
            'data': {
                'pricing': {
                    'monthly': Config.PREMIUM_MONTHLY_PRICE,
                    'currency': Config.CURRENCY,
                    'formatted': f"{Config.CURRENCY_SYMBOL}{Config.PREMIUM_MONTHLY_PRICE}/month"
                },
                'features': {
                    'free': [
                        'Basic recipe recommendations',
                        'Ingredient database access',
                        'Simple nutrition tips',
                        'Up to 3 recommendations per search'
                    ],
                    'premium': [
                        '7-Day Meal Planning',
                        'Unlimited recipe recommendations',
                        'Advanced nutrition analysis',
                        'Shopping list generator',
                        'Budget optimization tools',
                        'Priority customer support',
                        'AI-powered meal suggestions',
                        'Bulk cooking recommendations'
                    ]
                },
                'sponsored_content': {
                    'example': 'Sponsored: Buy Soy Chunks ₦300/pack from XYZ Vendor',
                    'note': 'Premium users see fewer sponsored items'
                }
            },
            'message': 'Premium features information retrieved successfully'
        }), 200
        
    except Exception as e:
        logger.error(f"Error getting premium features: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to get premium features',
            'message': str(e)
        }), 500