// Background grid, drawn on the GPU.
//
// Reproduces the SVG in grid-background.tsx (200 CSS px grid, four filled
// cells, radial mask from the top-right) and adds what SVG cannot do: a slow
// simplex-noise glow in the brand indigo, plus a soft spot that follows the
// pointer. Output is premultiplied alpha over the page background.

import { fbmSimplex3d } from "@vgpu/wgsl-std/noise/simplex";

struct Params {
  time: f32,
  dpr: f32,
  size: vec2f,    // physical pixels
  pointer: vec2f, // uv space, top-origin; off-screen until the pointer moves
}

@group(0) @binding(0) var<uniform> params: Params;

const CELL_CSS_PX: f32 = 200.0;
const GRID_COLOR = vec3f(1.0, 1.0, 1.0);          // stroke-white/10
const GRID_ALPHA: f32 = 0.10;
const FILL_COLOR = vec3f(0.122, 0.161, 0.216);    // gray-800/20
const FILL_ALPHA: f32 = 0.20;
const INDIGO_DEEP = vec3f(0.388, 0.400, 0.945);   // #6366f1
const INDIGO_PRIMARY = vec3f(0.506, 0.549, 0.973); // #818cf8, --primary
const GLOW_ALPHA: f32 = 0.16;
const SPOT_ALPHA: f32 = 0.10;
const SPOT_RADIUS: f32 = 0.22;                     // fraction of viewport height

fn remap(inMin: f32, inMax: f32, outMin: f32, outMax: f32, value: f32) -> f32 {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

// Source-over compositing on premultiplied (rgb, a).
fn over(dst: vec4f, color: vec3f, alpha: f32) -> vec4f {
  return vec4f(color * alpha + dst.rgb * (1.0 - alpha), alpha + dst.a * (1.0 - alpha));
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let size = params.size;
  let aspect = size.x / size.y;

  // CSS radial-gradient(100% 100% at top right, white, transparent):
  // a unit ellipse in uv space centred on the top-right corner.
  let mask = saturate(1.0 - length(vec2f(uv.x - 1.0, uv.y)));

  // Grid coordinates in physical pixels, origin at 50% like the SVG pattern.
  let cell = CELL_CSS_PX * params.dpr;
  let p = vec2f(uv.x * size.x - size.x * 0.5, uv.y * size.y);

  var out = vec4f(0.0);

  // 1. Noise glow, slow drift.
  let q = vec2f(uv.x * aspect, uv.y);
  let n = fbmSimplex3d(vec3f(q * 1.4, params.time * 0.045), 3, 2.17, 0.5);
  let glow = saturate(remap(-0.15, 0.85, 0.0, 1.0, n));
  let glowColor = mix(INDIGO_DEEP, INDIGO_PRIMARY, glow);
  out = over(out, glowColor, glow * glow * GLOW_ALPHA * mask);

  // 2. Pointer spot.
  let toPointer = (uv - params.pointer) * vec2f(aspect, 1.0);
  let d2 = dot(toPointer, toPointer);
  let spot = exp(-d2 / (2.0 * SPOT_RADIUS * SPOT_RADIUS));
  out = over(out, INDIGO_PRIMARY, spot * SPOT_ALPHA);

  // 3. The four filled cells from the SVG, in cell indices from the origin.
  let ci = vec2i(floor(p / cell));
  let filled =
    all(ci == vec2i(-1, 0)) || all(ci == vec2i(3, 0)) ||
    all(ci == vec2i(-2, 3)) || all(ci == vec2i(1, 4));
  out = over(out, FILL_COLOR, select(0.0, FILL_ALPHA, filled) * mask);

  // 4. Grid lines, 1 physical px, anti-aliased.
  let g = abs(fract(p / cell - 0.5) - 0.5) * cell;
  let line = 1.0 - smoothstep(0.0, 1.0, min(g.x, g.y));
  out = over(out, GRID_COLOR, line * GRID_ALPHA * mask);

  return out;
}
