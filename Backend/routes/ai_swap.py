# routes/ai_swap.py
from flask import Blueprint, request, jsonify
from services.ai_service import AIService

ai_swap_bp = Blueprint("ai_swap", __name__)

@ai_swap_bp.route("/ai-swap", methods=["POST"])
def ai_swap():
    data = request.get_json() or {}
    ingredients = data.get("ingredients", [])
    budget = data.get("budget")  # optional

    if not ingredients:
        return jsonify({
            "success": False,
            "error": "No ingredients provided",
            "message": "Please provide a list of ingredients to get suggestions."
        }), 400

    # Call AIService to generate recipe
    suggestion = AIService.generate_recipe_suggestion(ingredients, budget)

    if not suggestion["success"]:
        # Handle quota or API errors gracefully
        return jsonify({
            "success": False,
            "error": suggestion.get("error", "Unknown error"),
            "message": suggestion.get("message", "Failed to generate AI suggestion.")
        }), 200  # return 200 so frontend still gets JSON, not crash

    return jsonify({
        "success": True,
        "ingredients": ingredients,
        "suggestion": suggestion["recipe_suggestion"],
        "budget": suggestion.get("budget")
    }), 200
