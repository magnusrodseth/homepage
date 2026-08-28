import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { visit } from "unist-util-visit";

const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Cache per build: the same diagram is often referenced from several posts. */
const sizeCache = new Map();

function intrinsicSize(url) {
  if (!url.startsWith("/")) return null;
  if (sizeCache.has(url)) return sizeCache.get(url);

  let size = null;
  try {
    const { width, height } = imageSize(
      fs.readFileSync(path.join(PUBLIC_DIR, decodeURIComponent(url)))
    );
    if (width && height) size = { width, height };
  } catch {
    // A missing or unreadable file falls back to the component's default
    // aspect ratio rather than failing the build.
    size = null;
  }

  sizeCache.set(url, size);
  return size;
}

/**
 * Splits a paragraph into its image and its caption, for the two shapes the
 * posts use:
 *
 *   ![alt](src)          image and caption in one paragraph, separated by a
 *   _Caption._           soft line break (the common case), and
 *
 *   ![alt](src)          image alone, with the caption in the next paragraph.
 *
 *   _Caption._
 *
 * Returns null for anything that is not an image-only paragraph.
 */
function splitFigureParagraph(node, next) {
  if (node.type !== "paragraph" || node.children[0]?.type !== "image") {
    return null;
  }

  // A figure this plugin already built, seen again on the way down the tree.
  if (node.data?.hName === "figure") return null;

  const [image, ...rest] = node.children;
  const meaningful = rest.filter(
    (child) => child.type !== "break" && !isBlankText(child)
  );

  if (meaningful.length === 0) {
    const caption = isCaptionParagraph(next) ? next.children[0].children : null;
    return { image, caption, consumesNext: Boolean(caption) };
  }

  if (meaningful.length === 1 && meaningful[0].type === "emphasis") {
    return { image, caption: meaningful[0].children, consumesNext: false };
  }

  // An image with real prose beside it is a normal paragraph, not a figure.
  return null;
}

const isBlankText = (node) =>
  node.type === "text" && node.value.trim().length === 0;

/**
 * A paragraph holding nothing but emphasis, i.e. the `_Caption text._` line
 * some posts put in a paragraph of its own under an image.
 */
const isCaptionParagraph = (node) =>
  node?.type === "paragraph" &&
  node.children.length === 1 &&
  node.children[0].type === "emphasis";

/**
 * Turns the `![alt](src)` + `_caption_` pair the blog posts are written with
 * into a real `<figure>` / `<figcaption>`, and stamps each image with its
 * intrinsic size so `next/image` reserves the right box.
 *
 * The pairing lives here rather than in the MDX so the source files stay plain
 * Markdown: `/md/blog/<slug>` serves that text verbatim to agents, and a JSX
 * `<Figure>` element would be noise there.
 */
export function remarkFigures() {
  return (tree) => {
    visit(tree, "image", (node) => {
      const size = intrinsicSize(node.url);
      if (!size) return;
      node.data = node.data ?? {};
      node.data.hProperties = {
        ...node.data.hProperties,
        width: size.width,
        height: size.height,
      };
    });

    visit(tree, (node) => {
      if (!Array.isArray(node.children)) return;

      for (let i = 0; i < node.children.length; i++) {
        const split = splitFigureParagraph(
          node.children[i],
          node.children[i + 1]
        );
        if (!split) continue;

        const figure = {
          type: "paragraph",
          data: { hName: "figure" },
          children: [
            split.image,
            ...(split.caption
              ? [
                  {
                    type: "paragraph",
                    data: { hName: "figcaption" },
                    children: split.caption,
                  },
                ]
              : []),
          ],
        };

        node.children.splice(i, split.consumesNext ? 2 : 1, figure);
      }
    });
  };
}

export default remarkFigures;
