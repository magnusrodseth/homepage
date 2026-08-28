import { clock, effect, frameLoop, init, surface } from "vgpu";
import type { FrameLoopHandle } from "vgpu";
import gridShader from "./grid.wgsl";

const OFFSCREEN: [number, number] = [-10, -10];
const FPS = 30;
/** Pointer easing per frame; lower is smoother. */
const POINTER_LERP = 0.05;
/** Calm easing per frame, so route changes fade rather than jump. */
const CALM_LERP = 0.04;
/** Theme easing per frame; the contours recolour rather than snap. */
const DARK_LERP = 0.08;
/** Drift speed while reading, as a fraction of the normal speed. */
const CALM_SPEED = 0.08;

export type GridHandle = {
  /** 0 = normal, 1 = reading mode (slower, fainter, pointer nearly inert). */
  setCalm(value: number): void;
  /** 0 = light theme line colours, 1 = dark. */
  setDark(value: number): void;
  stop(): void;
};

/**
 * Starts the WebGPU background on `canvas`. Resolves once the first frame is
 * scheduled, rejects when WebGPU is unavailable (`VGPU-RING1-UNSUPPORTED`)
 * or the device fails. `stop()` on the handle tears everything down.
 */
export async function startGrid(
  canvas: HTMLCanvasElement,
  options: { calm?: number; dark?: number } = {}
): Promise<GridHandle> {
  const gpu = await init({ powerPreference: "low-power" });

  const canvasSurface = surface(gpu, canvas, {
    dpr: [1, 2],
    label: "grid-background",
  });

  const grid = effect(gpu, gridShader, {
    label: "grid",
    set: {
      params: {
        time: 0,
        dpr: canvasSurface.dpr,
        size: [canvasSurface.size[0], canvasSurface.size[1]],
        pointer: OFFSCREEN,
        calm: options.calm ?? 0,
        dark: options.dark ?? 1,
      },
    },
  });

  const unsubscribeResize = canvasSurface.onResize(({ width, height, dpr }) => {
    grid.set({ params: { size: [width, height], dpr } });
  });

  const time = clock(gpu);
  const target: [number, number] = [...OFFSCREEN];
  const pointer: [number, number] = [...OFFSCREEN];
  let calmTarget = options.calm ?? 0;
  let calm = calmTarget;
  let darkTarget = options.dark ?? 1;
  // Start at the target so the first frame is already the right theme; only
  // later toggles ease.
  let dark = darkTarget;
  // Drift phase in seconds; advanced slower while calm so a route change
  // changes speed without the field jumping.
  let phase = 0;

  const onPointerMove = (event: PointerEvent) => {
    target[0] = event.clientX / window.innerWidth;
    target[1] = event.clientY / window.innerHeight;
  };
  const onPointerLeave = () => {
    target[0] = OFFSCREEN[0];
    target[1] = OFFSCREEN[1];
  };

  let loop: FrameLoopHandle | undefined;

  const tick = () => {
    pointer[0] += (target[0] - pointer[0]) * POINTER_LERP;
    pointer[1] += (target[1] - pointer[1]) * POINTER_LERP;
    calm += (calmTarget - calm) * CALM_LERP;
    dark += (darkTarget - dark) * DARK_LERP;
    phase += time.deltaTime * (1 - calm * (1 - CALM_SPEED));
    grid.set({ params: { time: phase, pointer, calm, dark } });
  };

  const start = () => {
    loop ??= frameLoop(
      gpu,
      (frame) => {
        tick();
        frame.pass(canvasSurface, grid);
      },
      { fps: FPS }
    );
  };
  const stop = () => {
    loop?.stop();
    loop = undefined;
  };

  // Do not burn GPU time in a background tab.
  const onVisibilityChange = () => {
    if (document.visibilityState === "hidden") stop();
    else start();
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerleave", onPointerLeave);
  document.addEventListener("visibilitychange", onVisibilityChange);

  start();

  return {
    setCalm(value) {
      calmTarget = Math.min(1, Math.max(0, value));
    },
    setDark(value) {
      darkTarget = Math.min(1, Math.max(0, value));
    },
    stop() {
      stop();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      unsubscribeResize();
      canvasSurface.dispose();
      gpu.dispose();
    },
  };
}
