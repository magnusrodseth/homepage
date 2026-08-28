import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

/**
 * Single source of truth for the MDX plugin pipeline, shared between
 * `next.config.mjs` (build-time MDX pages) and `next-mdx-remote` (blog posts).
 * Plain .mjs so the Next config can import it without a TS loader.
 */
export const mdxPlugins = {
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
        // Two themes: shiki emits both palettes as --shiki-light-*/--shiki-dark-*
        // custom properties and a space-separated `data-theme` on <code>.
        // src/styles/mdx.css picks between them off the `.dark` class.
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
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
};

/** Options object in the shape `next-mdx-remote`'s RSC `MDXRemote` expects. */
export const mdxRemoteOptions = {
  mdxOptions: mdxPlugins,
};
