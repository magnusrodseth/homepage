import { clock, effect, frameLoop, init, surface } from "vgpu";
import type { FrameLoopHandle } from "vgpu";
import gridShader from "./grid.wgsl";

const OFFSCREEN: [number, number] = [-10, -10];
const FPS = 30;
/** Pointer easing per frame; lower is smoother. */
const POINTER_LERP = 0.05;

/**
 * Starts the WebGPU grid on `canvas`. Resolves once the first frame is
 * scheduled, rejects when WebGPU is unavailable (`VGPU-RING1-UNSUPPORTED`)
 * or the device fails. The returned function tears everything down.
 */
export async function startGrid(
  canvas: HTMLCanvasElement
): Promise<() => void> {
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
      },
    },
  });

  const unsubscribeResize = canvasSurface.onResize(({ width, height, dpr }) => {
    grid.set({ params: { size: [width, height], dpr } });
  });

  const time = clock(gpu);
  const target: [number, number] = [...OFFSCREEN];
  const pointer: [number, number] = [...OFFSCREEN];

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
    grid.set({ params: { time: time.time, pointer } });
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

  return () => {
    stop();
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerleave", onPointerLeave);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    unsubscribeResize();
    canvasSurface.dispose();
    gpu.dispose();
  };
}
