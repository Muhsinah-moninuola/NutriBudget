from database import db
from config import Config
import jwt
import logging
from functools import wraps
from flask import request, jsonify, current_app

logger = logging.getLogger(__name__)

class AuthService:
    """Service for handling authentication and authorization."""
    
    @staticmethod
    def verify_token(token):
        """Verify JWT token from Supabase."""
        try:
            # In a real implementation, you'd verify the JWT with Supabase's public key
            # For now, we'll use a simple approach
            decoded = jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
            return decoded.get('user_id')
        except jwt.InvalidTokenError:
            return None
    
    @staticmethod
    def get_user_from_token(token):
        """Get user information from JWT token."""
        user_id = AuthService.verify_token(token)
        if user_id:
            return db.get_user_profile(user_id)
        return None
    
    @staticmethod
    def is_premium_user(user_id):
        """Check if user has premium subscription."""
        try:
            profile = db.get_user_profile(user_id)
            if profile:
                # In a real implementation, check subscription status
                # For demo purposes, check if preferences contain 'premium'
                preferences = profile.get('preferences', {})
                return preferences.get('is_premium', False)
            return False
        except Exception as e:
            logger.error(f"Error checking premium status: {str(e)}")
            return False

def auth_required(f):
    """Decorator to require authentication."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Authentication required'}), 401
        
        token = auth_header.split(' ')[1]
        user_id = AuthService.verify_token(token)
        if not user_id:
            return jsonify({'error': 'Invalid token'}), 401
        
        # Add user_id to request context
        request.user_id = user_id
        return f(*args, **kwargs)
    
    return decorated_function

def premium_required(f):
    """Decorator to require premium subscription."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not hasattr(request, 'user_id'):
            return jsonify({'error': 'Authentication required'}), 401
        
        if not AuthService.is_premium_user(request.user_id):
            return jsonify({
                'error': 'Premium subscription required',
                'message': f'Upgrade to Premium ({Config.CURRENCY_SYMBOL}{Config.PREMIUM_MONTHLY_PRICE}/month) to access this feature',
                'premium_price': Config.PREMIUM_MONTHLY_PRICE,
                'currency': Config.CURRENCY
            }), 403
        
        return f(*args, **kwargs)
    
    return decorated_function