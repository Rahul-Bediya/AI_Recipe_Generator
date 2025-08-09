"use client";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

export default function IngredientInput({ ingredients, setIngredients }) {
    const [input, setInput] = useState("");
    const [filePreview, setFilePreview] = useState(null);

    const addIngredient = () => {
        const v = input.trim();
        if (!v) return;
        setIngredients([...ingredients, v]);
        setInput("");
    };

    const pasteAdd = (text) => {
        if (!text) return;
        const items = text.split(/[, \n]+/).map(s => s.trim()).filter(Boolean);
        if (items.length) setIngredients([...ingredients, ...items]);
    };

    const handleFile = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => setFilePreview(reader.result);
        reader.readAsDataURL(f);
        // NOTE: If you want OCR or ingredient detection from the image, send the base64 to a server route that calls a vision API.
    };

    const remove = (idx) => {
        setIngredients(ingredients.filter((_, i) => i !== idx));
    };

    return (
<div className="bg-white p-6 rounded-xl shadow-xl shadow-gray-800/20 w-full sm:w-12/13 flex justify-start">
    <div className="w-full">
        <h3 className="text-lg font-semibold mb-3">What ingredients do you have?</h3>

        <div className="border-dashed border-2 border-gray-200 p-6 rounded-2xl text-center">
            <label className="cursor-pointer inline-block">
                <input onChange={handleFile} type="file" accept="image/*" className="hidden" />
                <div className="flex flex-col items-center py-8 text-gray-600 hover:text-orange-500 transition-colors">
                    <ImageIcon className="w-10 h-10 mb-2" />
                    <span>Upload a photo of your ingredients (optional)</span>
                </div>
            </label>
            {filePreview && (
                <img
                    src={filePreview}
                    alt="preview"
                    className="mx-auto mt-4 w-48 h-32 object-cover rounded"
                />
            )}
        </div>

        <div className="mt-4 flex gap-2 w-full">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addIngredient()}
                placeholder="Type an ingredient (e.g., tomatoes, rice)"
                className="flex-1 border border-gray-200 focus:border-orange-400 rounded-2xl p-2 transition-colors"
            />
            <button onClick={addIngredient} className="bg-orange-500 text-white px-4 rounded-2xl">+</button>
        </div>

        <textarea
            onBlur={(e) => pasteAdd(e.target.value)}
            placeholder="Or paste multiple ingredients separated by commas or new lines..."
            className="w-full mt-3 p-3 border border-gray-200 focus:border-orange-400 rounded-2xl h-24 resize-none transition-colors"
        />

        <div className="mt-3 flex flex-wrap gap-2">
            {ingredients.map((ing, i) => (
                <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded inline-flex items-center gap-2">
                    {ing}
                    <button onClick={() => remove(i)} className="text-sm opacity-70">×</button>
                </span>
            ))}
        </div>
    </div>
</div>
    );
}
