// Background: topographic contours.
//
// Contour lines of a slowly morphing fBM height field, like a map. The
// pointer pulls the field toward it so the contours bend around the cursor.
// Output is premultiplied alpha over the page background.

import { fbmSimplex3d } from "@vgpu/wgsl-std/noise/simplex";

struct Params {
  time: f32,     // drift phase, advanced by the loop at a route-dependent speed
  dpr: f32,
  size: vec2f,
  pointer: vec2f,
  calm: f32,     // 0 on normal pages, 1 while reading a post
  dark: f32,     // 1 on the dark theme, 0 on light; eased so a toggle fades
}

@group(0) @binding(0) var<uniform> params: Params;

const LEVELS: f32 = 14.0;
// Dark theme: light indigo on near-black. Light theme: the same ramp walked
// the other way, darker and a little stronger, so the contours read against
// white at a comparable weight. scripts/render-topo-fallback.mjs mirrors all
// six constants; change them together.
//
// The alphas are flat across the frame. There used to be a radial mask
// brightening the top-right corner, which pulled the eye there instead of
// leaving the field as texture behind the page.
const LINE_LOW_DARK = vec3f(0.506, 0.549, 0.973);   // #818cf8, --primary (dark)
const LINE_HIGH_DARK = vec3f(0.78, 0.82, 1.0);      // lavender, near indigo-200
const LINE_ALPHA_DARK: f32 = 0.14;
const LINE_LOW_LIGHT = vec3f(0.192, 0.180, 0.573);  // #312e93, near indigo-900
const LINE_HIGH_LIGHT = vec3f(0.310, 0.275, 0.898); // #4f46e5, --primary (light)
const LINE_ALPHA_LIGHT: f32 = 0.17;
const SPOT_RADIUS: f32 = 0.42;
// Reading mode (calm = 1): fraction of the normal line alpha and pointer bump.
const CALM_ALPHA: f32 = 0.45;
const CALM_BUMP: f32 = 0.2;
const BUMP_HEIGHT: f32 = 0.16;   // in height-field units; higher = more contours bunch around the pointer

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.size.x / params.size.y;
  let q = vec2f(uv.x * aspect, uv.y);

  // The pointer is a bump in the height field.
  let toPointer = (uv - params.pointer) * vec2f(aspect, 1.0);
  let bump = exp(-dot(toPointer, toPointer) / (2.0 * SPOT_RADIUS * SPOT_RADIUS));

  let bumpHeight = BUMP_HEIGHT * mix(1.0, CALM_BUMP, params.calm);
  let h = fbmSimplex3d(vec3f(q * 1.6, params.time * 0.012), 4, 2.17, 0.5) * 0.5 + 0.5 + bump * bumpHeight;

  // Anti-aliased iso-lines: distance to the nearest level in screen space.
  let level = h * LEVELS;
  let f = fract(level);
  let d = min(f, 1.0 - f) / max(fwidth(level), 1e-4);
  let line = 1.0 - smoothstep(0.0, 1.5, d);

  // Every fourth contour is an index line, slightly stronger.
  let index = select(0.7, 1.0, fract(floor(level) / 4.0) < 0.01);

  let lineLow = mix(LINE_LOW_LIGHT, LINE_LOW_DARK, params.dark);
  let lineHigh = mix(LINE_HIGH_LIGHT, LINE_HIGH_DARK, params.dark);
  let baseAlpha = mix(LINE_ALPHA_LIGHT, LINE_ALPHA_DARK, params.dark);

  let color = mix(lineLow, lineHigh, h);
  let lineAlpha = baseAlpha * mix(1.0, CALM_ALPHA, params.calm);
  let pointerBoost = 0.3 * bump * (1.0 - params.calm);
  let alpha = line * index * lineAlpha * (0.85 + pointerBoost);
  return vec4f(color * alpha, alpha);
}
