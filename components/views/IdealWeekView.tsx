"use client";

import { PlannerGrid } from "@/components/PlannerGrid";
import { useStore } from "@/store/useStore";

export function IdealWeekView() {
  const { clearIdealWeek } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Ideal Week</h2>
          <p className="text-zinc-400 mt-1">Design your perfect 168-hour schedule.</p>
        </div>
        <button
          onClick={clearIdealWeek}
          className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          Clear Grid
        </button>
      </div>

      <PlannerGrid type="ideal" />
    </div>
  );
}
