"use client";

import { useState } from "react";
import { LayoutDashboard, Calendar, CalendarClock, Tags, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardView } from "@/components/views/DashboardView";
import { CurrentWeekView } from "@/components/views/CurrentWeekView";
import { IdealWeekView } from "@/components/views/IdealWeekView";
import { CategoriesView } from "@/components/views/CategoriesView";

type TabId = "dashboard" | "current" | "ideal" | "categories";

const TABS = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "current", name: "Current Week", icon: Calendar },
  { id: "ideal", name: "Ideal Week", icon: CalendarClock },
  { id: "categories", name: "Categories", icon: Tags },
] as const;

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 lg:px-8 overflow-hidden border-b border-zinc-800/50 bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-zinc-950 to-zinc-950"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-8 border border-orange-500/20">
            <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>
            168 Hours in a Week
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Design your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">ideal life</span>.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop wondering where your time goes. Track your current habits, design your perfect week, and discover the annual impact of your daily choices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => {
                setActiveTab("current");
                document.getElementById("app-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-all flex items-center gap-2 hover:gap-3 w-full sm:w-auto justify-center"
            >
              Start Tracking
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                setActiveTab("dashboard");
                document.getElementById("app-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-full font-medium transition-all w-full sm:w-auto"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* App Section */}
      <section id="app-section" className="flex-1 bg-zinc-950 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 pt-8 pb-4 mb-8">
            <div className="flex overflow-x-auto hide-scrollbar gap-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                      isActive
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active View */}
          <div className="min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === "dashboard" && <DashboardView />}
            {activeTab === "current" && <CurrentWeekView />}
            {activeTab === "ideal" && <IdealWeekView />}
            {activeTab === "categories" && <CategoriesView />}
          </div>
        </div>
      </section>
    </div>
  );
}
