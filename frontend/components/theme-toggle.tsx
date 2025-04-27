"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

/** ThemeToggle – entire button (icon + label) is clickable */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="flex items-center gap-2 px-3 py-2">
        Toggle theme
      </Button>
    );
  }

  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = isDark ? "Light mode" : "Dark mode";
  const Icon = isDark ? Sun : Moon;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
      onClick={() => setTheme(nextTheme)}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Button>
  );
}
