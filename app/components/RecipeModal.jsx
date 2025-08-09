// "use client";

// export default function RecipeModal({ recipe, onClose }) {
//   const isObj = typeof recipe === "object" && recipe !== null;

//   // A tiny demo nutrition summary (if your backend provides nutrition, replace this)
//   const mockNutrition = {
//     calories: 320,
//     protein: "12g",
//     carbs: "28g",
//     fat: "18g",
//     fiber: "8g"
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-auto max-h-[90vh]">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="text-xl font-semibold">{isObj ? recipe.title ?? "Recipe" : String(recipe).split("\n")[0]}</h3>
//           <button onClick={onClose} className="text-gray-600 text-xl">×</button>
//         </div>

//         <div className="p-6 grid md:grid-cols-3 gap-6">
//           <div className="md:col-span-2 space-y-4">
//             {isObj ? (
//               <>
//                 {recipe.image && (
//                   <img src={recipe.image} alt={recipe.title} className="w-full rounded mb-4 max-h-64 object-cover" />
//                 )}
//                 <p className="text-base mb-2">{recipe.description}</p>
//                 {recipe.ingredients && (
//                   <div>
//                     <h4 className="font-semibold mb-1">Ingredients</h4>
//                     <ul className="list-disc list-inside text-sm mb-2">
//                       {recipe.ingredients.map((ing, idx) => (
//                         <li key={idx}>{ing}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 {recipe.instructions && (
//                   <div>
//                     <h4 className="font-semibold mb-1">Instructions</h4>
//                     <ol className="list-decimal list-inside text-sm space-y-1">
//                       {Array.isArray(recipe.instructions)
//                         ? recipe.instructions.map((step, idx) => <li key={idx}>{step}</li>)
//                         : recipe.instructions.split("\n").map((step, idx) => <li key={idx}>{step}</li>)
//                       }
//                     </ol>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <pre className="whitespace-pre-wrap text-sm leading-6">{String(recipe)}</pre>
//             )}
//           </div>

//           <aside className="bg-gray-50 p-4 rounded">
//             <h4 className="font-semibold mb-3">Nutritional Insights</h4>
//             <ul className="text-sm space-y-2">
//               <li>Calories: <strong>{recipe.nutrition?.calories ?? mockNutrition.calories}</strong></li>
//               <li>Protein: <strong>{recipe.nutrition?.protein ?? mockNutrition.protein}</strong></li>
//               <li>Carbs: <strong>{recipe.nutrition?.carbs ?? mockNutrition.carbs}</strong></li>
//               <li>Fat: <strong>{recipe.nutrition?.fat ?? mockNutrition.fat}</strong></li>
//               <li>Fiber: <strong>{recipe.nutrition?.fiber ?? mockNutrition.fiber}</strong></li>
//             </ul>
//             <div className="mt-4 text-xs text-gray-600">
//               Tip: For exact nutrient breakdown, integrate Spoonacular or Nutritionix and pass the recipe ingredients.
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { Flame, UtensilsCrossed, ListOrdered, Info, X, Leaf, Drumstick, Clock, Users } from "lucide-react";


const fallbackImages = ["/item1.jpg", "/item2.jpg", "/item3.jpg"];

function getLocalImage(index = 0) {
  return fallbackImages[index % fallbackImages.length];
}

export default function RecipeModal({ recipe, onClose, index = 0 }) {
  const isObj = typeof recipe === "object" && recipe !== null;

  // Demo nutrition summary (if your backend provides nutrition, replace this)
  const mockNutrition = {
    calories: 320,
    protein: "12g",
    carbs: "28g",
    fat: "18g",
    fiber: "8g"
  };

  // Pick a local image always (since you want only local images)
  const imageSrc = getLocalImage(index);

  // Diet tag icon helper
  const getDietIcon = (tag) => {
    if (/veg/i.test(tag)) return <Leaf className="inline w-4 h-4 text-green-600 mr-1" />;
    if (/non.?veg/i.test(tag)) return <Drumstick className="inline w-4 h-4 text-red-600 mr-1" />;
    return <UtensilsCrossed className="inline w-4 h-4 text-orange-400 mr-1" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-gradient-to-br from-orange-50 via-white to-green-50 w-full max-w-4xl rounded-2xl shadow-2xl overflow-auto max-h-[95vh] border-2 border-orange-200 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-full p-2 shadow transition"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col md:flex-row gap-8 p-6">
          {/* Left: Image and main info */}
          <div className="md:w-2/5 flex flex-col items-center">
            <img
              src={imageSrc}
              alt={recipe.title}
              className="w-full h-56 object-cover rounded-xl shadow-lg border-4 border-green-200 mb-4"
            />
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {recipe.dietTags && recipe.dietTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold shadow"
                >
                  {getDietIcon(tag)}
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4 justify-center mt-2 text-sm">
              {recipe.cookTime && (
                <span className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  <Clock className="w-4 h-4" /> {recipe.cookTime} min
                </span>
              )}
              {recipe.servings && (
                <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  <Users className="w-4 h-4" /> {recipe.servings} servings
                </span>
              )}
              {recipe.difficulty && (
                <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  <Info className="w-4 h-4" /> {recipe.difficulty}
                </span>
              )}
            </div>
          </div>
          {/* Right: Details */}
          <div className="md:w-3/5 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-orange-700 flex items-center gap-2 mb-2">
                <UtensilsCrossed className="w-6 h-6 text-green-600" />
                {isObj ? recipe.title ?? "Recipe" : String(recipe).split("\n")[0]}
              </h3>
              <p className="text-base text-gray-700 mb-2">{recipe.description}</p>
            </div>
            {recipe.ingredients && (
              <div>
                <h4 className="font-semibold mb-1 flex items-center gap-2 text-green-700">
                  <ListOrdered className="w-5 h-5" /> Ingredients
                </h4>
                <ul className="list-disc list-inside text-sm mb-2 text-gray-800">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}
            {recipe.instructions && (
              <div>
                <h4 className="font-semibold mb-1 flex items-center gap-2 text-orange-700">
                  <Flame className="w-5 h-5" /> Instructions
                </h4>
                <ol className="list-decimal list-inside text-sm space-y-1 text-gray-800">
                  {Array.isArray(recipe.instructions)
                    ? recipe.instructions.map((step, idx) => <li key={idx}>{step}</li>)
                    : recipe.instructions.split("\n").map((step, idx) => <li key={idx}>{step}</li>)
                  }
                </ol>
              </div>
            )}
            <div className="bg-gradient-to-r from-orange-100 to-green-100 rounded-lg p-4 shadow-inner mt-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-orange-700">
                <Flame className="w-5 h-5" /> Nutritional Insights
              </h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>
                  <span className="font-semibold text-orange-600">Calories:</span>{" "}
                  <strong>{recipe.nutrition?.calories ?? mockNutrition.calories}</strong>
                </li>
                <li>
                  <span className="font-semibold text-green-600">Protein:</span>{" "}
                  <strong>{recipe.nutrition?.protein ?? mockNutrition.protein}</strong>
                </li>
                <li>
                  <span className="font-semibold text-blue-600">Carbs:</span>{" "}
                  <strong>{recipe.nutrition?.carbs ?? mockNutrition.carbs}</strong>
                </li>
                <li>
                  <span className="font-semibold text-purple-600">Fat:</span>{" "}
                  <strong>{recipe.nutrition?.fat ?? mockNutrition.fat}</strong>
                </li>
                <li>
                  <span className="font-semibold text-pink-600">Fiber:</span>{" "}
                  <strong>{recipe.nutrition?.fiber ?? mockNutrition.fiber}</strong>
                </li>
              </ul>
              <div className="mt-4 text-xs text-gray-500">
                Tip: For exact nutrient breakdown, integrate Spoonacular or Nutritionix and pass the recipe ingredients.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}