import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

const AGENT_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
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
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
