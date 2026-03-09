"use client";

import { PlannerGrid } from "@/components/PlannerGrid";
import { useStore } from "@/store/useStore";

export default function CurrentWeekPage() {
  const { clearCurrentWeek } = useStore();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Current Week</h1>
          <p className="text-zinc-400 mt-2">How you actually spend your 168 hours.</p>
        </div>
        <button
          onClick={clearCurrentWeek}
          className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          Clear Grid
        </button>
      </div>

      <PlannerGrid type="current" />
    </div>
  );
}
