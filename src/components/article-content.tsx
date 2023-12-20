import { Post, Project } from "contentlayer/generated";
import BackLink from "./back-link";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Callout } from "./callout";
import { Icons } from "./icons";
import { Mdx } from "./mdx-components";
import { H1 } from "./ui/typography";
import { Separator } from "./ui/separator";

type ArticleContentProps = {
  item: Post | Project;
};

const ArticleContent = ({ item }: ArticleContentProps) => {
  return (
    <article className="container relative max-w-5xl py-6 lg:py-10">
      <BackLink />

      <div className="flex flex-col md:flex-row gap-y-2 justify-start items-center my-4 gap-x-2 text-muted-foreground text-sm animate-slide-enter">
        {item.date && (
          <time dateTime={item.date}>Published {formatDate(item.date)}</time>
        )}
        {item.readingTimeInMinutes && (
          <>
            <Separator orientation="vertical" className="h-6 hidden md:flex" />
            <span>{item.readingTimeInMinutes} min read</span>
          </>
        )}
      </div>
      <H1 className="animate-slide-enter">{item.title}</H1>

      <Callout className="animate-slide-enter" icon={<Icons.lightbulb />}>
        {item.description}
      </Callout>

      {item.image && (
        <div className="w-full relative animate-slide-enter delay-200">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="my-8 rounded-md border bg-muted transition-colors object-cover"
            priority
          />
        </div>
      )}

      <div className="my-8">
        <Mdx code={item.body.code} />
      </div>

      <Separator className="my-4" />

      <div className="flex justify-center">
        <BackLink />
      </div>
    </article>
  );
};

export default ArticleContent;
