"use client";

import { useState, useCallback, useEffect } from "react";
import { useStore, Category, TimeBlock } from "@/store/useStore";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

interface PlannerGridProps {
  type: "current" | "ideal";
}

export function PlannerGrid({ type }: PlannerGridProps) {
  const { categories, currentWeek, idealWeek, updateCurrentBlock, updateIdealBlock } = useStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(categories.length > 0 ? categories[0].id : null);
  const [isDragging, setIsDragging] = useState(false);

  const weekData = type === "current" ? currentWeek : idealWeek;
  const updateBlock = type === "current" ? updateCurrentBlock : updateIdealBlock;

  const handlePointerDown = (day: number, hour: number) => {
    setIsDragging(true);
    updateBlock(day, hour, selectedCategoryId);
  };

  const handlePointerEnter = (day: number, hour: number) => {
    if (isDragging) {
      updateBlock(day, hour, selectedCategoryId);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, []);

  const getCategoryColor = (categoryId: string | null) => {
    if (!categoryId) return "transparent";
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.color : "transparent";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="w-full text-sm font-medium text-zinc-400 mb-2">Select Category to Paint</div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryId(cat.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
              selectedCategoryId === cat.id
                ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900"
                : "opacity-70 hover:opacity-100"
            )}
            style={{ backgroundColor: cat.color, color: "#fff" }}
          >
            {cat.name}
          </button>
        ))}
        <button
          onClick={() => setSelectedCategoryId(null)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all border border-zinc-700 bg-zinc-800 text-zinc-300",
            selectedCategoryId === null
              ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900"
              : "opacity-70 hover:opacity-100"
          )}
        >
          Eraser
        </button>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-1 mb-2">
            <div></div>
            {DAYS.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-zinc-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-1 select-none touch-none">
            {HOURS.map((hour) => (
              <div key={hour} className="contents">
                <div className="text-xs text-zinc-500 text-right pr-4 py-2 flex items-center justify-end">
                  {hour.toString().padStart(2, "0")}:00
                </div>
                {DAYS.map((_, dayIndex) => {
                  const block = weekData.find((b) => b.day === dayIndex && b.hour === hour);
                  const color = getCategoryColor(block?.categoryId || null);
                  
                  return (
                    <div
                      key={`${dayIndex}-${hour}`}
                      className="h-10 rounded-sm border border-zinc-800/50 transition-colors cursor-crosshair"
                      style={{
                        backgroundColor: color === "transparent" ? "rgba(39, 39, 42, 0.3)" : color,
                      }}
                      onPointerDown={() => handlePointerDown(dayIndex, hour)}
                      onPointerEnter={() => handlePointerEnter(dayIndex, hour)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
