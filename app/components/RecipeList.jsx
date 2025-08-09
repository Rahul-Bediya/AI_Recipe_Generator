import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, onSelect }) {
  if (!recipes || recipes.length === 0) {
    return <div className="py-6 text-sm text-gray-500">No recipes yet — generate using the panel on the right.</div>;
  }

  return (
    <div className="space-y-4 mt-4 ">
      {recipes.map((r, i) => (
        <RecipeCard key={i} recipe={r} onSelect={() => onSelect(r)} />
      ))}
    </div>
  );
}
