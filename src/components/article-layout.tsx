import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/mdx.css";
import { Heading } from "contentlayer.config";
import { Post, Project } from "contentlayer/generated";
import ArticleContent from "./article-content";
import TableOfContents from "./table-of-contents";

type ArticleLayoutProps = {
  item: Post | Project;
  headings: Heading[];
};

const ArticleLayout = ({ item, headings }: ArticleLayoutProps) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row w-full justify-between",
        item.toc ? "lg:gap-x-4" : "lg:gap-x-0"
      )}
    >
      <ArticleContent item={item} />
      {item.toc && <TableOfContents headings={headings} />}
    </div>
  );
};

export default ArticleLayout;
