"use client";

import { useEffect, useRef, useState } from "react";
import GridBackground from "@/components/grid-background";
import { cn } from "@/lib/utils";

/** Run `fn` when the browser is idle so the hero image keeps LCP. */
function whenIdle(fn: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 200);
  return () => window.clearTimeout(id);
}

/**
 * The site background. Server-renders the static SVG grid, then upgrades to
 * the WebGPU shader when the browser supports it and the visitor has not
 * asked for reduced motion. Any failure leaves the SVG in place.
 */
export function GpuGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!("gpu" in navigator)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let dispose: (() => void) | undefined;

    const cancelIdle = whenIdle(() => {
      // Dynamic import keeps vgpu and the shader out of the initial bundle.
      import("./start-grid")
        .then(({ startGrid }) => startGrid(canvas))
        .then((stop) => {
          if (disposed) return stop();
          dispose = stop;
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
      dispose?.();
    };
  }, []);

  // The SVG is unmounted rather than faded: an opacity wrapper would create a
  // stacking context, cancel the SVG's negative z-index, and leave an
  // invisible element on top of the navbar that swallows every click.
  return (
    <>
      {!ready && <GridBackground />}
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
