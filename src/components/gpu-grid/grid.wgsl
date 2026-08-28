// Background: topographic contours.
//
// Contour lines of a slowly morphing fBM height field, like a map. The
// pointer pulls the field toward it so the contours bend around the cursor.
// Output is premultiplied alpha over the page background.

import { fbmSimplex3d } from "@vgpu/wgsl-std/noise/simplex";

struct Params {
  time: f32,
  dpr: f32,
  size: vec2f,
  pointer: vec2f,
}

@group(0) @binding(0) var<uniform> params: Params;

const LEVELS: f32 = 14.0;
const LINE_LOW = vec3f(0.506, 0.549, 0.973);   // #818cf8, --primary
const LINE_HIGH = vec3f(0.78, 0.82, 1.0);      // lavender, near indigo-200
const LINE_ALPHA: f32 = 0.32;
const MASK_FLOOR: f32 = 0.35;
const SPOT_RADIUS: f32 = 0.3;

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.size.x / params.size.y;
  let q = vec2f(uv.x * aspect, uv.y);

  let mask = mix(MASK_FLOOR, 1.0, saturate(1.0 - length(vec2f(uv.x - 1.0, uv.y))));

  // The pointer is a bump in the height field.
  let toPointer = (uv - params.pointer) * vec2f(aspect, 1.0);
  let bump = exp(-dot(toPointer, toPointer) / (2.0 * SPOT_RADIUS * SPOT_RADIUS));

  let h = fbmSimplex3d(vec3f(q * 1.6, params.time * 0.035), 4, 2.17, 0.5) * 0.5 + 0.5 + bump * 0.45;

  // Anti-aliased iso-lines: distance to the nearest level in screen space.
  let level = h * LEVELS;
  let f = fract(level);
  let d = min(f, 1.0 - f) / max(fwidth(level), 1e-4);
  let line = 1.0 - smoothstep(0.0, 1.5, d);

  // Every fourth contour is an index line, slightly stronger.
  let index = select(0.7, 1.0, fract(floor(level) / 4.0) < 0.01);

  let color = mix(LINE_LOW, LINE_HIGH, h);
  let alpha = line * index * LINE_ALPHA * mask * (0.7 + 0.6 * bump);
  return vec4f(color * alpha, alpha);
}
