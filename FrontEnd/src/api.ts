const API_BASE = "https://nutribudget.onrender.com"

export async function fetchIngredients() {
  const res = await fetch(`${API_BASE}/api/ingredients`);
  return res.json();
}

export async function fetchRecipes() {
  const res = await fetch(`${API_BASE}/api/recipes`);
  return res.json();
}

export async function getProteinSwap(body: { protein: string }) {
  const res = await fetch(`${API_BASE}/api/ai-swap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function recommendRecipes(token: string, body: { ingredients: string[] }) {
  const res = await fetch(`${API_BASE}/api/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}
