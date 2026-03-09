"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, CalendarClock, Tags } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Current Week", href: "/current", icon: Calendar },
  { name: "Ideal Week", href: "/ideal", icon: CalendarClock },
  { name: "Categories", href: "/categories", icon: Tags },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-zinc-900 text-zinc-100 flex flex-col h-screen border-r border-zinc-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="text-indigo-500">168</span> Hours
        </h1>
        <p className="text-xs text-zinc-400 mt-1">Life Time Planner</p>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-zinc-800">
        <div className="text-xs text-zinc-500">
          A week has 168 hours.<br />Make them count.
        </div>
      </div>
    </div>
  );
}
