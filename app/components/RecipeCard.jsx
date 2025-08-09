
// "use client";
// import fallback1 from "../../public/item1.jpg";
// import fallback2 from "../../public/item2.jpg";
// import fallback3 from "../../public/item3.jpg";
// import { ChefHat, Clock, Users, Flame, Zap } from "lucide-react";
// import { useState } from "react";

// // Helper to pick a local fallback image
// const fallbackImages = [fallback1, fallback2, fallback3];

// function getLocalImage(index = 0) {
//   return fallbackImages[index % fallbackImages.length];
// }

// export default function RecipeCard({ recipe, onSelect, index = 0 }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Helper for badge color
//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case "Easy":
//         return "bg-green-200 text-green-800";
//       case "Medium":
//         return "bg-yellow-200 text-yellow-800";
//       case "Hard":
//         return "bg-red-200 text-red-800";
//       default:
//         return "bg-gray-200 text-gray-800";
//     }
//   };

//   // Always use a local fallback image
//   const imageSrc = getLocalImage(index);

//   return (
//     <div className="bg-white bg-gradient-card backdrop-blur-sm border-0 shadow-soft hover:shadow-warm transition-all duration-300 animate-fadeIn overflow-hidden group rounded-xl flex flex-col shadow shadow-xl shadow-gray-800/20">
//       <div className="relative overflow-hidden">
//         <img
//           src={imageSrc}
//           alt={recipe.title}
//           className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//         {recipe.difficulty && (
//           <div className="absolute top-4 right-4">
//             <span className={`inline-flex items-center px-2 py-1 rounded ${getDifficultyColor(recipe.difficulty)} text-xs font-medium`}>
//               <ChefHat className="w-3 h-3 mr-1" />
//               {recipe.difficulty}
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="p-4">
//         <div className="mb-2">
//           <div className="text-xl font-semibold text-foreground">{recipe.title}</div>
//           <p className="text-muted-foreground text-sm">{recipe.description}</p>
//         </div>

//         <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
//           {recipe.cookTime && (
//             <div className="flex items-center gap-1">
//               <Clock className="w-4 h-4" />
//               {recipe.cookTime} min
//             </div>
//           )}
//           {recipe.servings && (
//             <div className="flex items-center gap-1">
//               <Users className="w-4 h-4" />
//               {recipe.servings} servings
//             </div>
//           )}
//         </div>

//         {recipe.dietTags && recipe.dietTags.length > 0 && (
//           <div className="flex flex-wrap gap-1 mb-3">
//             {recipe.dietTags.map((tag, idx) => (
//               <span key={idx} className="border rounded px-2 py-0.5 text-xs">{tag}</span>
//             ))}
//           </div>
//         )}

//         {/* Nutrition */}
//         {recipe.nutrition && (
//           <div className="bg-muted/50 rounded-lg p-4 mb-4">
//             <h4 className="font-medium mb-3 flex items-center gap-2">
//               <Flame className="w-4 h-4 text-orange-400" />
//               Nutrition per serving
//             </h4>
//             <div className="grid grid-cols-2 gap-3">
//               <div className="text-center">
//                 <div className="font-semibold text-lg text-orange-400">{recipe.nutrition.calories}</div>
//                 <div className="text-xs text-muted-foreground">Calories</div>
//               </div>
//               <div className="text-center">
//                 <div className="font-semibold text-lg text-green-500">{recipe.nutrition.protein}g</div>
//                 <div className="text-xs text-muted-foreground">Protein</div>
//               </div>
//               <div className="text-center">
//                 <div className="font-semibold text-lg text-blue-500">{recipe.nutrition.carbs}g</div>
//                 <div className="text-xs text-muted-foreground">Carbs</div>
//               </div>
//               <div className="text-center">
//                 <div className="font-semibold text-lg text-purple-500">{recipe.nutrition.fat}g</div>
//                 <div className="text-xs text-muted-foreground">Fat</div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Ingredients Preview */}
//         {recipe.ingredients && (
//           <div className="mb-4">
//             <h4 className="font-medium mb-2">Ingredients</h4>
//             <div className="text-sm text-muted-foreground">
//               {recipe.ingredients.slice(0, 3).join(", ")}
//               {recipe.ingredients.length > 3 && ` +${recipe.ingredients.length - 3} more`}
//             </div>
//           </div>
//         )}

//         <button
//           className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-warm transition-all duration-300 text-white py-2 rounded flex items-center justify-center gap-2"
//           onClick={onSelect}
//         >
//           <Zap className="w-4 h-4 mr-2" />
//           View Full Recipe
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { ChefHat, Clock, Users, Flame, Zap } from "lucide-react";
import { useState } from "react";

// You can store just the paths if images are in /public
const fallbackImages = ["/item1.jpg", "/item2.jpg", "/item3.jpg"];

function getLocalImage(index = 0) {
  return fallbackImages[index % fallbackImages.length];
}

export default function RecipeCard({ recipe, onSelect, index = 0 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-200 text-green-800";
      case "Medium":
        return "bg-yellow-200 text-yellow-800";
      case "Hard":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const imageSrc = getLocalImage(index);

  return (
    <div className="bg-white bg-gradient-card backdrop-blur-sm border-0 shadow-soft hover:shadow-warm transition-all duration-300 animate-fadeIn overflow-hidden group rounded-xl flex flex-col shadow shadow-xl shadow-gray-800/20">
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt={recipe.title || "Recipe"}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {recipe.difficulty && (
          <div className="absolute top-4 right-4">
            <span
              className={`inline-flex items-center px-2 py-1 rounded ${getDifficultyColor(
                recipe.difficulty
              )} text-xs font-medium`}
            >
              <ChefHat className="w-3 h-3 mr-1" />
              {recipe.difficulty}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <div className="text-xl font-semibold text-foreground">
            {recipe.title}
          </div>
          <p className="text-muted-foreground text-sm">{recipe.description}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          {recipe.cookTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {recipe.cookTime} min
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {recipe.servings} servings
            </div>
          )}
        </div>

        {recipe.dietTags && recipe.dietTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.dietTags.map((tag, idx) => (
              <span key={idx} className="border rounded px-2 py-0.5 text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        {recipe.nutrition && (
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              Nutrition per serving
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="font-semibold text-lg text-orange-400">
                  {recipe.nutrition.calories}
                </div>
                <div className="text-xs text-muted-foreground">Calories</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg text-green-500">
                  {recipe.nutrition.protein}g
                </div>
                <div className="text-xs text-muted-foreground">Protein</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg text-blue-500">
                  {recipe.nutrition.carbs}g
                </div>
                <div className="text-xs text-muted-foreground">Carbs</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg text-purple-500">
                  {recipe.nutrition.fat}g
                </div>
                <div className="text-xs text-muted-foreground">Fat</div>
              </div>
            </div>
          </div>
        )}

        {recipe.ingredients && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Ingredients</h4>
            <div className="text-sm text-muted-foreground">
              {recipe.ingredients.slice(0, 3).join(", ")}
              {recipe.ingredients.length > 3 &&
                ` +${recipe.ingredients.length - 3} more`}
            </div>
          </div>
        )}

        <button
          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-warm transition-all duration-300 text-white py-2 rounded flex items-center justify-center gap-2"
          onClick={onSelect}
        >
          <Zap className="w-4 h-4 mr-2" />
          View Full Recipe
        </button>
      </div>
    </div>
  );
}
