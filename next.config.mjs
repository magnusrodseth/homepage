import createMDX from "@next/mdx";
import { mdxPlugins } from "./src/lib/mdx-plugins.mjs";

const AGENT_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  // WGSL shaders (vgpu). `dev`/`build` run --webpack; the turbopack rule is
  // there so a plain `next dev` works too. Next never validates WGSL, so run
  // `npx vgpu check <file>.wgsl --require-validation` before shipping one.
  webpack(config) {
    config.module.rules.push({
      test: /\.wgsl$/,
      loader: "@vgpu/wgsl/loader-webpack",
      options: { minify: process.env.NODE_ENV === "production" },
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.wgsl": {
        loaders: ["@vgpu/wgsl/loader-webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co", // Spotify album art
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub avatars
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/.well-known/api-catalog",
        destination: "/well-known/api-catalog",
      },
      {
        source: "/.well-known/agent-skills/index.json",
        destination: "/well-known/agent-skills",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Link", value: AGENT_LINK_HEADER },
          { key: "Vary", value: "Accept" },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: mdxPlugins,
});

export default withMDX(nextConfig);
