# services/ai_service.py
import os
import logging
from config import Config
from openai import OpenAI, RateLimitError

logger = logging.getLogger(__name__)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AIService:
    @staticmethod
    def generate_recipe_suggestion(ingredients, budget=None):
        """
        Generate recipe suggestions using OpenAI in a concise way to reduce token usage.
        ingredients: list of ingredient names
        budget: optional maximum budget in Naira
        """
        if not ingredients:
            return {
                "success": False,
                "error": "No ingredients provided",
                "message": "Please provide at least one ingredient."
            }

        try:
            # Concise prompt to save tokens
            prompt = f"Suggest a simple Nigerian recipe using {', '.join(ingredients)}"
            if budget:
                prompt += f" within ₦{budget} budget"
            prompt += ". Provide only cooking steps and estimated cost. Keep it short and concise."

            # Use GPT-3.5-turbo but with smaller max_tokens
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=250  # smaller to save tokens
            )

            recipe_text = response.choices[0].message.content.strip()

            return {
                "success": True,
                "ingredients": ingredients,
                "recipe_suggestion": recipe_text,
                "budget": f"{Config.CURRENCY_SYMBOL}{budget}" if budget else None
            }

        except RateLimitError:
            logger.warning("OpenAI rate limit reached")
            return {
                "success": False,
                "error": "Quota exceeded",
                "message": "You've reached your free token limit. Try again later."
            }

        except Exception as e:
            logger.error(f"OpenAI request failed: {str(e)}")
            return {
                "success": False,
                "error": "Failed to generate recipe",
                "message": str(e)
            }
