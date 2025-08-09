"use client";

const OPTIONS = [
  { label: "Vegetarian", bg: "bg-green-100", text: "text-green-800", border: "border-green-300", icon: "🌱" },
  { label: "Vegan", bg: "bg-lime-100", text: "text-lime-800", border: "border-lime-300", icon: "🥦" },
  { label: "Non-Vegetarian", bg: "bg-red-100", text: "text-red-800", border: "border-red-300", icon: "🍖" },
  { label: "Pescatarian", bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300", icon: "🐟" },
  { label: "Keto", bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", icon: "🥓" },
  { label: "Low Carb", bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300", icon: "🥚" },
  { label: "High Protein", bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", icon: "💪" },
];

export default function Preferences({ preferences, setPreferences }) {
  const toggle = (opt) => {
    setPreferences(prev =>
      prev.includes(opt) ? prev.filter(p => p !== opt) : [...prev, opt]
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl shadow-gray-800/20 mt-2 sm:w-12/13">
      <h3 className="text-lg font-semibold mb-3">Dietary Preferences</h3>
      <div className="flex flex-wrap gap-3">
        {OPTIONS.map(opt => (
          <button
            key={opt.label}
            onClick={() => toggle(opt.label)}
            className={`px-4 py-2 rounded-full border transition-colors flex items-center gap-2
              ${opt.bg} ${opt.text} ${opt.border}
              ${preferences.includes(opt.label) ? "ring-2 ring-offset-2 ring-orange-400" : "opacity-80 hover:opacity-100"}
            `}
          >
            <span className="text-xl">{opt.icon}</span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
    );
}