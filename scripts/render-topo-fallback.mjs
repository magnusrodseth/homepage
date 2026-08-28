// Renders the topo background's height field headlessly with vgpu, traces the
// same contour levels the shader draws, and writes them as SVGs that the page
// shows before WebGPU is ready (and forever on browsers without it).
//
//   bun run background:fallback
//
// One file per theme: the stroke colours are baked into the markup, and an SVG
// behind a CSS url() is isolated, so neither currentColor nor a custom
// property reaches inside it. `.topo-fallback` in globals.css picks between
// them, so only the matching file is ever fetched.
//
// Re-run whenever the field expression, LEVELS, or the line colours in
// src/components/gpu-grid/grid.wgsl change.

import { writeFileSync } from "node:fs";
import { resolveShader } from "@vgpu/wgsl/runtime";
import { init, effect, target } from "vgpu/node";

// Mirror of the shader constants.
const LEVELS = 14;
const BASE_BOOST = 0.85; // (0.85 + pointerBoost) with the pointer off-screen
const THEMES = [
  {
    file: "topo-fallback.svg",
    lineLow: [0.506, 0.549, 0.973],
    lineHigh: [0.78, 0.82, 1.0],
    lineAlpha: 0.14,
  },
  {
    file: "topo-fallback-light.svg",
    lineLow: [0.192, 0.18, 0.573],
    lineHigh: [0.31, 0.275, 0.898],
    lineAlpha: 0.17,
  },
];

// Field is sampled in units of viewport height; cover up to 2.8:1 viewports.
const UNITS_H = 100;
const ASPECT = 2.8;
const PX_PER_UNIT = 8;
const W = Math.round(ASPECT * UNITS_H * PX_PER_UNIT);
const H = UNITS_H * PX_PER_UNIT;
const SIMPLIFY_TOLERANCE = 0.12; // units; 0.1 unit ≈ 1px at 1000px viewport height

const { wgsl } = await resolveShader({
  entry: new URL("./topo-height.wgsl", import.meta.url).pathname,
  validate: "require",
});

const gpu = await init();
const field = target(gpu, { size: [W, H] });
effect(gpu, wgsl, { set: { params: { aspect: ASPECT } } }).draw(field);
const px = await field.read();
await gpu.settled();
gpu.dispose();

// Decode to a Float32 height grid.
const h = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) h[i] = (px[i * 4] * 256 + px[i * 4 + 1]) / 65535;

// Marching squares: one polyline set per contour level.
function trace(iso) {
  const segs = [];
  const at = (x, y) => h[y * W + x];
  const lerp = (a, b) => (iso - a) / (b - a);
  for (let y = 0; y < H - 1; y++) {
    for (let x = 0; x < W - 1; x++) {
      const tl = at(x, y), tr = at(x + 1, y), br = at(x + 1, y + 1), bl = at(x, y + 1);
      const idx = (tl >= iso ? 8 : 0) | (tr >= iso ? 4 : 0) | (br >= iso ? 2 : 0) | (bl >= iso ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      const top = [x + lerp(tl, tr), y];
      const right = [x + 1, y + lerp(tr, br)];
      const bottom = [x + lerp(bl, br), y + 1];
      const left = [x, y + lerp(tl, bl)];
      const push = (a, b) => segs.push([a, b]);
      switch (idx) {
        case 1: case 14: push(left, bottom); break;
        case 2: case 13: push(bottom, right); break;
        case 3: case 12: push(left, right); break;
        case 4: case 11: push(top, right); break;
        case 6: case 9: push(top, bottom); break;
        case 7: case 8: push(left, top); break;
        case 5: push(left, top); push(bottom, right); break;
        case 10: push(top, right); push(left, bottom); break;
      }
    }
  }
  return chain(segs);
}

// Join segments into polylines by shared endpoints.
function chain(segs) {
  const key = (p) => `${p[0].toFixed(3)},${p[1].toFixed(3)}`;
  const byPoint = new Map();
  segs.forEach((s, i) => {
    for (const p of s) {
      const k = key(p);
      if (!byPoint.has(k)) byPoint.set(k, []);
      byPoint.get(k).push(i);
    }
  });
  const used = new Uint8Array(segs.length);
  const lines = [];
  const extend = (line, endPoint) => {
    for (;;) {
      const k = key(endPoint);
      const next = (byPoint.get(k) ?? []).find((i) => !used[i]);
      if (next === undefined) return;
      used[next] = 1;
      const [a, b] = segs[next];
      endPoint = key(a) === k ? b : a;
      line.push(endPoint);
    }
  };
  for (let i = 0; i < segs.length; i++) {
    if (used[i]) continue;
    used[i] = 1;
    const [a, b] = segs[i];
    const line = [a, b];
    extend(line, b);
    line.reverse();
    extend(line, a);
    lines.push(line);
  }
  return lines;
}

// Ramer–Douglas–Peucker.
function simplify(points, tol) {
  if (points.length < 3) return points;
  const sq = (p, a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len = dx * dx + dy * dy;
    let t = len ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len : 0;
    t = Math.max(0, Math.min(1, t));
    const ex = a[0] + t * dx - p[0], ey = a[1] + t * dy - p[1];
    return ex * ex + ey * ey;
  };
  let maxD = 0, maxI = 0;
  const a = points[0], b = points[points.length - 1];
  for (let i = 1; i < points.length - 1; i++) {
    const d = sq(points[i], a, b);
    if (d > maxD) { maxD = d; maxI = i; }
  }
  if (maxD <= tol * tol) return [a, b];
  return [...simplify(points.slice(0, maxI + 1), tol).slice(0, -1), ...simplify(points.slice(maxI), tol)];
}

const toUnits = (p) => [p[0] / PX_PER_UNIT, p[1] / PX_PER_UNIT];
const fmt = (n) => (Math.round(n * 10) / 10).toString();

// Trace once; every theme reuses the same geometry and only recolours it.
const levels = [];
let points = 0;
for (let k = 1; k < LEVELS; k++) {
  const iso = k / LEVELS;
  const d = trace(iso)
    .map((line) => simplify(line.map(toUnits), SIMPLIFY_TOLERANCE))
    .filter((line) => line.length > 1)
    .map((line) => {
      points += line.length;
      const [first, ...rest] = line;
      return `M${fmt(first[0])} ${fmt(first[1])}L${rest.map((p) => `${fmt(p[0])} ${fmt(p[1])}`).join(" ")}`;
    })
    .join("");
  levels.push({ iso, isIndex: k % 4 === 0, d });
}

for (const theme of THEMES) {
  const rgb = (t) =>
    theme.lineLow.map((lo, i) => Math.round((lo + (theme.lineHigh[i] - lo) * t) * 255));

  const groups = levels.map(({ iso, isIndex, d }) => {
    const alpha = theme.lineAlpha * BASE_BOOST * (isIndex ? 1 : 0.7);
    const [r, g, b] = rgb(iso);
    // vector-effect does not inherit, so it goes on every path: 1 CSS px lines
    // at any viewport size, like the shader's screen-space lines.
    return `<path vector-effect="non-scaling-stroke" stroke="rgb(${r},${g},${b})" stroke-opacity="${alpha.toFixed(3)}" d="${d}"/>`;
  });

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ASPECT * UNITS_H} ${UNITS_H}" preserveAspectRatio="xMinYMin slice">` +
    `<g fill="none" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">` +
    groups.join("") +
    `</g></svg>`;

  const out = new URL(`../public/${theme.file}`, import.meta.url).pathname;
  writeFileSync(out, svg);
  console.log(`wrote ${out}: ${(svg.length / 1024).toFixed(0)} KB, ${points} points, ${LEVELS - 1} levels, field ${W}x${H}`);
}
