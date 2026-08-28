// Height field of the topo background at drift phase 0, no pointer, for
// tracing the static fallback. Keep the field expression identical to
// src/components/gpu-grid/grid.wgsl. Encodes h as 16 bits: r = high, g = low.

import { fbmSimplex3d } from "@vgpu/wgsl-std/noise/simplex";

struct Params { aspect: f32 }
@group(0) @binding(0) var<uniform> params: Params;

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let q = vec2f(uv.x * params.aspect, uv.y);
  let h = fbmSimplex3d(vec3f(q * 1.6, 0.0), 4, 2.17, 0.5) * 0.5 + 0.5;
  let v = saturate(h) * 65535.0;
  let hi = floor(v / 256.0);
  let lo = v - hi * 256.0;
  return vec4f(hi / 255.0, lo / 255.0, 0.0, 1.0);
}
