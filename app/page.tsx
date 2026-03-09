"use client";

import { useStore } from "@/store/useStore";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useMemo } from "react";
import { Clock, Target, Activity, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { categories, currentWeek, idealWeek } = useStore();

  const stats = useMemo(() => {
    const currentAllocated = currentWeek.filter((b) => b.categoryId !== null).length;
    const idealAllocated = idealWeek.filter((b) => b.categoryId !== null).length;

    const currentByCategory = categories.map((cat) => ({
      name: cat.name,
      value: currentWeek.filter((b) => b.categoryId === cat.id).length,
      color: cat.color,
    })).filter(c => c.value > 0);

    const idealByCategory = categories.map((cat) => ({
      name: cat.name,
      value: idealWeek.filter((b) => b.categoryId === cat.id).length,
      color: cat.color,
    })).filter(c => c.value > 0);

    const comparisonData = categories.map((cat) => {
      const current = currentWeek.filter((b) => b.categoryId === cat.id).length;
      const ideal = idealWeek.filter((b) => b.categoryId === cat.id).length;
      return {
        name: cat.name,
        Current: current,
        Ideal: ideal,
        diff: current - ideal,
        color: cat.color,
      };
    }).filter(c => c.Current > 0 || c.Ideal > 0);

    // Generate insights
    const insights = comparisonData
      .filter((d) => Math.abs(d.diff) > 2)
      .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))
      .map((d) => {
        const annualImpact = Math.abs(d.diff) * 52;
        if (d.diff > 0) {
          return {
            title: `Over-allocated: ${d.name}`,
            desc: `You spend ${d.diff} more hours on ${d.name} than planned.`,
            impact: `Annual impact: ${annualImpact} hours (~${Math.round(annualImpact / 24)} days)`,
            type: "warning",
          };
        } else {
          return {
            title: `Under-allocated: ${d.name}`,
            desc: `You spend ${Math.abs(d.diff)} fewer hours on ${d.name} than planned.`,
            impact: `Annual impact: ${annualImpact} hours (~${Math.round(annualImpact / 24)} days)`,
            type: "info",
          };
        }
      });

    // Calculate balance score (simple version: 100 - average % deviation)
    let totalDeviation = 0;
    let totalIdeal = 0;
    comparisonData.forEach(d => {
      if (d.Ideal > 0) {
        totalDeviation += Math.abs(d.diff);
        totalIdeal += d.Ideal;
      }
    });
    const balanceScore = totalIdeal > 0 ? Math.max(0, Math.round(100 - (totalDeviation / totalIdeal) * 100)) : 0;

    return {
      currentAllocated,
      idealAllocated,
      currentByCategory,
      idealByCategory,
      comparisonData,
      insights,
      balanceScore
    };
  }, [categories, currentWeek, idealWeek]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-zinc-400 mt-2">Your 168 hours at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-zinc-400 mb-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <span className="font-medium">Current Tracked</span>
          </div>
          <div className="text-4xl font-light text-white">
            {stats.currentAllocated} <span className="text-xl text-zinc-500">/ 168h</span>
          </div>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-zinc-400 mb-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <span className="font-medium">Ideal Planned</span>
          </div>
          <div className="text-4xl font-light text-white">
            {stats.idealAllocated} <span className="text-xl text-zinc-500">/ 168h</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-zinc-400 mb-2">
            <Activity className="w-5 h-5 text-amber-400" />
            <span className="font-medium">Balance Score</span>
          </div>
          <div className="text-4xl font-light text-white">
            {stats.balanceScore}<span className="text-xl text-zinc-500">%</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-zinc-400 mb-2">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <span className="font-medium">Key Insights</span>
          </div>
          <div className="text-4xl font-light text-white">
            {stats.insights.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-medium text-white mb-6">Current Distribution</h3>
          <div className="h-[300px]">
            {stats.currentByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.currentByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {stats.currentByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-500">
                No data tracked yet. Go to Current Week to start.
              </div>
            )}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-medium text-white mb-6">Current vs Ideal</h3>
          <div className="h-[300px]">
            {stats.comparisonData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.comparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                    cursor={{ fill: '#27272a', opacity: 0.4 }}
                  />
                  <Legend />
                  <Bar dataKey="Current" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Ideal" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-500">
                Not enough data to compare.
              </div>
            )}
          </div>
        </div>
      </div>

      {stats.insights.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-medium text-white mb-6">Actionable Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.insights.map((insight, i) => (
              <div key={i} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 ${insight.type === 'warning' ? 'text-rose-400' : 'text-indigo-400'}`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-200">{insight.title}</h4>
                    <p className="text-sm text-zinc-400 mt-1">{insight.desc}</p>
                    <p className="text-xs font-mono text-zinc-500 mt-3">{insight.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
