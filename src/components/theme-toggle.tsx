"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

/**
 * Connects the AnimatedThemeToggler to next-themes.
 *
 * Controlled: the toggler flips the `.dark` class synchronously inside the
 * view transition, and `setTheme` persists that choice and keeps every other
 * `useTheme()` subscriber in sync. Until mounted, `resolvedTheme` is undefined
 * (the server cannot know the OS preference), so a same-sized placeholder
 * holds the layout instead of rendering the wrong icon.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const buttonClasses = cn(
    "hover-rise flex h-5 w-5 items-center justify-center",
    "text-muted-foreground hover:text-primary duration-150",
    "[&>svg]:h-5 [&>svg]:w-5",
    className
  );

  if (!mounted) {
    return <span aria-hidden className={cn("block h-5 w-5", className)} />;
  }

  return (
    <AnimatedThemeToggler
      className={buttonClasses}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onThemeChange={setTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    />
  );
}
