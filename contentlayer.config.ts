import { readingTimeInMinutes } from "./src/lib/readingTime";
import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger";

export type Heading = {
  level: string;
  text: string | undefined;
  slug: string | undefined;
};

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  readingTimeInMinutes: {
    type: "number",
    resolve: (doc) => readingTimeInMinutes(doc.body.raw),
  },
  headings: {
    type: "json",
    // Fetch every heading from the MDX file
    resolve: async (doc): Promise<Heading[]> => {
      const regexHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
      const slugger = new GithubSlugger();

      const rawBody = (await doc.body.raw) as string;

      const headings = Array.from(rawBody.matchAll(regexHeader)).map(
        ({ groups }) => {
          const flag = groups?.flag || "";
          const content = groups?.content;

          return {
            level:
              flag?.length == 1
                ? "one"
                : flag?.length == 2
                ? "two"
                : flag?.length == 3
                ? "three"
                : flag?.length == 4
                ? "four"
                : flag?.length == 5
                ? "five"
                : flag?.length == 6
                ? "six"
                : "one",
            text: content,
            slug: content ? slugger.slug(content) : undefined,
          };
        }
      );

      return headings;
    },
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: false,
    },
    toc: {
      type: "boolean",
      required: false,
      default: true,
    },
  },
  computedFields,
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    link: {
      type: "string",
      required: false,
    },
    githubLink: {
      type: "string",
      required: false,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: false,
    },
    toc: {
      type: "boolean",
      required: false,
      default: false,
    },
  },
  computedFields,
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  computedFields,
}));

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Post, Project, Page],

  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
