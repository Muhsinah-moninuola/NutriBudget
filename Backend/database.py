from supabase import create_client, Client
from config import Config
import logging

logger = logging.getLogger(__name__)

class Database:
    """Supabase database client wrapper for NutriBudget."""
    
    _instance = None
    _client = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if self._client is None:
            try:
                Config.validate_config()
                self._client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)
                logger.info("Supabase client initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize Supabase client: {str(e)}")
                raise
    
    @property
    def client(self) -> Client:
        """Get the Supabase client instance."""
        if self._client is None:
            raise RuntimeError("Database client not initialized")
        return self._client
    
    def get_all_ingredients(self):
        """Fetch all ingredients from the database."""
        try:
            response = self.client.table('ingredients').select('*').execute()
            return response.data
        except Exception as e:
            logger.error(f"Error fetching ingredients: {str(e)}")
            raise
    
    def get_all_recipes(self):
        """Fetch all recipes from the database."""
        try:
            response = self.client.table('recipes').select('*').execute()
            return response.data
        except Exception as e:
            logger.error(f"Error fetching recipes: {str(e)}")
            raise
    
    def get_user_ingredients(self, user_id):
        """Fetch user's available ingredients."""
        try:
            response = self.client.table('user_ingredients').select(
                'quantity, ingredient:ingredients(id, name, category)'
            ).eq('user_id', user_id).execute()
            return response.data
        except Exception as e:
            logger.error(f"Error fetching user ingredients: {str(e)}")
            raise
    
    def get_recipe_ingredients(self, recipe_id):
        """Fetch ingredients for a specific recipe."""
        try:
            response = self.client.table('recipe_ingredients').select(
                'quantity, ingredient:ingredients(id, name, category)'
            ).eq('recipe_id', recipe_id).execute()
            return response.data
        except Exception as e:
            logger.error(f"Error fetching recipe ingredients: {str(e)}")
            raise
    
    def get_user_profile(self, user_id):
        """Fetch user profile information."""
        try:
            response = self.client.table('profiles').select('*').eq('id', user_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error fetching user profile: {str(e)}")
            raise

# Global database instance
db = Database()