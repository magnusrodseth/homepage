"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps next-themes so the root layout can stay a server component.
 *
 * `defaultTheme="system"` means a first-time visitor gets whatever their OS is
 * set to; the toggler then writes an explicit `light`/`dark` that wins from
 * then on. next-themes injects a blocking script that puts the class on <html>
 * before first paint, which is why <html> needs `suppressHydrationWarning`.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
