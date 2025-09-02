import os
from flask import Flask, jsonify
from flask_cors import CORS
import logging
from config import Config

# Import route blueprints
from routes.ingredients import ingredients_bp
from routes.recipes import recipes_bp
from routes.recommendations import recommendations_bp
from routes.budget_plan import budget_plan_bp
from routes.ai_swap import ai_swap_bp
from routes.premium import premium_bp

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS for all routes
    CORS(app, origins="*", allow_headers=["Content-Type", "Authorization"])
    
    # Register blueprints
    app.register_blueprint(ingredients_bp, url_prefix='/api')
    app.register_blueprint(recipes_bp, url_prefix='/api')
    app.register_blueprint(recommendations_bp, url_prefix='/api')
    app.register_blueprint(budget_plan_bp, url_prefix='/api')
    app.register_blueprint(ai_swap_bp, url_prefix='/api')
    app.register_blueprint(premium_bp, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'service': 'NutriBudget Backend',
            'version': '1.0.0',
            'message': 'Flask backend is running successfully'
        }), 200
    
    # Root endpoint with API information
    @app.route('/')
    def root():
        return jsonify({
            'service': 'NutriBudget API',
            'version': '1.0.0',
            'description': 'Backend API for NutriBudget - Smart nutrition planning with Nigerian Naira budgeting',
            'currency': Config.CURRENCY,
            'endpoints': {
                'ingredients': '/api/ingredients',
                'recipes': '/api/recipes',
                'recommendations': '/api/recommend',
                'budget_planning': '/api/budget-plan (Premium)',
                'ai_alternatives': '/api/ai-swap',
                'premium_status': '/api/premium-status'
            },
            'features': {
                'free': 'Basic recipe recommendations, ingredient database',
                'premium': f'7-Day meal planning, unlimited recommendations ({Config.CURRENCY_SYMBOL}{Config.PREMIUM_MONTHLY_PRICE}/month)'
            }
        }), 200
    
    # Global error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'success': False,
            'error': 'Endpoint not found',
            'message': 'The requested API endpoint does not exist'
        }), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        logger.error(f"Internal server error: {str(error)}")
        return jsonify({
            'success': False,
            'error': 'Internal server error',
            'message': 'An unexpected error occurred. Please try again later.'
        }), 500
    
    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({
            'success': False,
            'error': 'Access forbidden',
            'message': 'You do not have permission to access this resource'
        }), 403
    
    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({
            'success': False,
            'error': 'Unauthorized',
            'message': 'Authentication required to access this resource'
        }), 401
    
    return app

# Create the application instance
app = create_app()

if __name__ == '__main__':
    try:
        # Validate configuration before starting
        Config.validate_config()
        logger.info("Starting NutriBudget Flask backend...")
        logger.info(f"Premium pricing: {Config.CURRENCY_SYMBOL}{Config.PREMIUM_MONTHLY_PRICE}/month")
        
        app.run(
            host='0.0.0.0',
            port=int(os.environ.get("PORT", 5000)),  # use Render's assigned port
            debug=Config.DEBUG
        )
    except Exception as e:
        logger.error(f"Failed to start application: {str(e)}")
        print(f"Error: {str(e)}")
        print("Please check your environment variables and Supabase configuration.")
