

"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import Hero from "./components/Hero";
import IngredientInput from "./components/IngredientInout";
import Preferences from "./components/Prefrences";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";

export default function HomePage() {
  const [ingredients, setIngredients] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const generateRecipes = async () => {
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }

    setLoading(true);
    setRecipes([]);

    try {
const prompt = `You are a professional chef AI.
Based on these ingredients: ${ingredients.join(", ")}
And these preferences: ${preferences.length ? preferences.join(", ") : "none"}
Generate 3 unique recipes in valid JSON format.
Each recipe must have:
- title (string)
- description (string)
- ingredients (array of strings)
- instructions (array of strings)
- cookTime (number of minutes, integer)
- servings (number of people, integer)
- nutrition (object with calories, protein, carbs, fat, all as numbers or strings with units)

Only return valid JSON, no extra text.`;

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Groq API Error: ${errorText}`);
      }

      const data = await res.json();
      const rawContent = data.choices?.[0]?.message?.content?.trim();

      let parsedRecipes;
      try {
        parsedRecipes = JSON.parse(rawContent);
      } catch (err) {
        console.error("JSON parse error:", err, "Raw output:", rawContent);
        throw new Error("AI returned invalid JSON. Please try again.");
      }

      if (Array.isArray(parsedRecipes) && parsedRecipes.length > 0) {
        setRecipes(parsedRecipes);
      } else {
        alert("No recipes generated.");
      }
    } catch (err) {
      alert(err.message || "Error generating recipes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <Hero />

      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6 sm:ml-0 lg:ml-12">
            <IngredientInput
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
            <Preferences
              preferences={preferences}
              setPreferences={setPreferences}
            />
          </div>

          {/* Right Column - Generation */}
          <div className="lg:sticky lg:top-8 space-y-6 sm:mr-0 lg:mr-12">
            <div className="bg-gradient-to-r from-orange-400 to-green-400 text-white rounded-xl p-4 sm:p-6 shadow shadow-xl shadow-gray-800/20 w-full">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-3xl font-bold">AI Recipe Generator</h3>
                <p className="mt-2 font-semibold text-sm opacity-90">
                  Let AI create amazing recipes based on your ingredients and preferences.
                </p>
                <div className="mt-4 flex gap-2 justify-center">
                  <button
                    onClick={generateRecipes}
                    disabled={loading}
                    className="rounded-md px-4 py-2 bg-white/20 hover:bg-white/30 flex items-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    {loading ? "Generating..." : "Generate Recipes"}
                  </button>
                </div>
                <p className="mt-3 text-xs opacity-90">
                  Using {ingredients.length} ingredient(s): {ingredients.join(", ")}
                </p>
              </div>
            </div>

            {/* Show recipes only after Generate is clicked */}
            {recipes.length > 0 && (
              <div className="rounded-xl p-4 shadow shadow-xl shadow-gray-800/20">
                <h4 className="font-semibold">Your Personalized Recipes</h4>
                <RecipeList
                  recipes={recipes}
                  onSelect={(r) => setSelectedRecipe(r)}
                  className="flex flex-col"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

