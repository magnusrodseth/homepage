"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import type { GridHandle } from "./start-grid";

/** Reading a post: the background goes nearly still and much fainter. */
function calmFor(pathname: string): number {
  return /^\/blog\/[^/]+/.test(pathname) ? 1 : 0;
}

/** The shader's `dark` uniform: 1 on the dark theme, 0 on light. */
function darkFor(resolvedTheme: string | undefined): number {
  return resolvedTheme === "light" ? 0 : 1;
}

/** Run `fn` when the browser is idle so the hero image keeps LCP. */
function whenIdle(fn: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 200);
  return () => window.clearTimeout(id);
}

/** Matches the canvas fade-in duration below. */
const FADE_MS = 1000;

/**
 * The site background: topographic contours.
 *
 * Server-renders a static SVG traced from the shader's own height field, then
 * fades the live WebGPU version in over it when the browser supports it and
 * the visitor has not asked for reduced motion. Because both start from the
 * same field, the hand-over is invisible. Any failure leaves the SVG in place.
 *
 * The SVG is a CSS `background-image` (`.topo-fallback` in globals.css), not
 * an <img>: an SVG behind url() is isolated, so its baked-in contour colours
 * cannot be restyled from the page, and there is one traced file per theme.
 * As a background only the matching one is ever fetched, and the class swap
 * happens at first paint rather than after hydration. Regenerate both with
 * `bun run background:fallback`.
 *
 * Both layers are `fixed -z-10 pointer-events-none`: a positioned element
 * with a negative z-index stays behind the page even while its opacity
 * animates. Do not wrap them in a non-positioned element with opacity; that
 * creates a stacking context above the navbar that swallows clicks.
 */
export function GpuGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<GridHandle | null>(null);
  const [ready, setReady] = useState(false);
  const [fallbackHidden, setFallbackHidden] = useState(false);
  const calm = calmFor(usePathname());
  const { resolvedTheme } = useTheme();
  const dark = darkFor(resolvedTheme);

  useEffect(() => {
    handleRef.current?.setCalm(calm);
  }, [calm]);

  useEffect(() => {
    handleRef.current?.setDark(dark);
  }, [dark]);

  // Drop the static layer once the canvas has fully faded in over it.
  useEffect(() => {
    if (!ready) return;
    const id = window.setTimeout(() => setFallbackHidden(true), FADE_MS + 100);
    return () => window.clearTimeout(id);
  }, [ready]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!("gpu" in navigator)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;

    const cancelIdle = whenIdle(() => {
      // Dynamic import keeps vgpu and the shader out of the initial bundle.
      import("./start-grid")
        .then(({ startGrid }) =>
          startGrid(canvas, {
            calm: calmFor(window.location.pathname),
            // Read the live class rather than `dark` from the closure: this
            // effect deliberately runs once, so the closure would pin the
            // first render's theme.
            dark: document.documentElement.classList.contains("dark") ? 1 : 0,
          })
        )
        .then((handle) => {
          if (disposed) return handle.stop();
          handleRef.current = handle;
          setReady(true);
        })
        .catch((error: unknown) => {
          // Expected on browsers without WebGPU; the SVG stays.
          console.debug("[grid] WebGPU background unavailable", error);
        });
    });

    return () => {
      disposed = true;
      cancelIdle();
      handleRef.current?.stop();
      handleRef.current = null;
    };
  }, []);

  return (
    <>
      {/* The contours are deliberately flat across the frame: no vignette, no
          corner hotspot. The shader mirrors the same calm dimming (0.45). */}
      <div
        aria-hidden="true"
        className={cn(
          "topo-fallback",
          "pointer-events-none fixed inset-0 -z-10 h-full w-full select-none",
          "transition-opacity duration-500",
          fallbackHidden ? "opacity-0" : calm ? "opacity-45" : "opacity-100"
        )}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed inset-0 -z-10 h-full w-full",
          "transition-opacity duration-1000",
          ready ? "opacity-100" : "opacity-0"
        )}
      />
    </>
  );
}
