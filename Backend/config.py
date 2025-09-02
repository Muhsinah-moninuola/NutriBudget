import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configuration class for NutriBudget Flask application."""
    
    # Supabase Configuration
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')
    SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_KEY')
    
    #Openai configuration
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    
    # Flask Configuration
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_ENV') == 'development'
    
    # Currency Configuration
    CURRENCY = 'NGN'
    CURRENCY_SYMBOL = '₦'
    
    # Premium Pricing
    PREMIUM_MONTHLY_PRICE = 500  # Nigerian Naira
    
    @classmethod
    def validate_config(cls):
        """Validate that required configuration is present."""
        required_vars = ['SUPABASE_URL', 'SUPABASE_KEY']
        missing_vars = []
        
        for var in required_vars:
            if not getattr(cls, var):
                missing_vars.append(var)
        
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")
        
        return True