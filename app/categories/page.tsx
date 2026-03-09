"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

export default function CategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("#3b82f6");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState("");

  const handleAdd = () => {
    if (newName.trim()) {
      addCategory({ name: newName.trim(), color: newColor });
      setNewName("");
      setIsAdding(false);
    }
  };

  const startEdit = (cat: { id: string; name: string; color: string }) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditColor(cat.color);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      updateCategory(editingId, { name: editName.trim(), color: editColor });
      setEditingId(null);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Categories</h1>
          <p className="text-zinc-400 mt-2">Manage how you classify your time.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="grid gap-4">
        {isAdding && (
          <div className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
            />
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Category Name"
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <button onClick={handleAdd} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg">
              <Check className="w-5 h-5" />
            </button>
            <button onClick={() => setIsAdding(false)} className="p-2 text-zinc-400 hover:bg-zinc-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl group">
            {editingId === cat.id ? (
              <>
                <input
                  type="color"
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                />
                <button onClick={saveEdit} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg">
                  <Check className="w-5 h-5" />
                </button>
                <button onClick={() => setEditingId(null)} className="p-2 text-zinc-400 hover:bg-zinc-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="flex-1 text-lg font-medium text-zinc-200">{cat.name}</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <button onClick={() => startEdit(cat)} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteCategory(cat.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
