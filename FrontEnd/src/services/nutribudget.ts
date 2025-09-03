const BASE_URL = "https://nutribudget.onrender.com"; // deployed Flask backend

export async function fetchRecipes() {
  const res = await fetch(`${BASE_URL}/api/recipes`); // <-- add /api
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json(); // returns an array of recipes
}

export async function fetchIngredients() {
  const res = await fetch(`${BASE_URL}/api/ingredients`); // <-- add /api
  if (!res.ok) throw new Error("Failed to fetch ingredients");
  return res.json();
}
