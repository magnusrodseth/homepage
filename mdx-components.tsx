import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { cn } from "./src/lib/utils";
import { Callout } from "./src/components/callout";
import { ZoomableImage } from "./src/components/zoomable-image";
import { MdxCard } from "./src/components/mdx-card";
import {
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  P,
} from "./src/components/ui/typography";
import { Separator } from "./src/components/ui/separator";

type HTMLElementProps = React.HTMLAttributes<HTMLElement>;

/** remark-figures stamps intrinsic sizes as strings; next/image wants numbers. */
function toDimension(value: string | number | undefined): number | undefined {
  const parsed = typeof value === "string" ? Number(value) : value;
  return typeof parsed === "number" && Number.isFinite(parsed) && parsed > 0
    ? parsed
    : undefined;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }: HTMLElementProps) => (
      <H1
        className={cn(
          "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
          "animate-slide-enter stagger-150",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: HTMLElementProps) => (
      <H2
        className={cn("mb-0", "animate-slide-enter stagger-150", className)}
        {...props}
      />
    ),
    h3: ({ className, ...props }: HTMLElementProps) => (
      <H3
        className={cn("animate-slide-enter stagger-150", className)}
        {...props}
      />
    ),
    h4: ({ className, ...props }: HTMLElementProps) => (
      <H4
        className={cn("animate-slide-enter stagger-150", className)}
        {...props}
      />
    ),
    h5: ({ className, ...props }: HTMLElementProps) => (
      <H4
        className={cn(
          "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
          "animate-slide-enter stagger-150",
          className
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }: HTMLElementProps) => (
      <H4
        className={cn(
          "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
          "animate-slide-enter stagger-150",
          className
        )}
        {...props}
      />
    ),
    a: ({
      className,
      href,
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const isAnchor = href?.startsWith("#");
      const isInternal = href?.startsWith("/") || isAnchor;

      return (
        <Link
          href={href ?? ""}
          target={!isInternal ? "_blank" : undefined}
          rel={!isInternal ? "noopener noreferrer" : undefined}
          className={cn(
            !isAnchor && "font-medium underline underline-offset-4",
            isAnchor && "no-underline hover:text-primary/80 transition-colors",
            "animate-slide-enter stagger-150",
            className
          )}
          {...props}
        >
          {children}
        </Link>
      );
    },
    p: ({ className, ...props }: HTMLElementProps) => (
      <P
        className={cn("animate-slide-enter stagger-150", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }: HTMLElementProps) => (
      <ul
        className={cn(
          "my-6 ml-6 list-disc",
          "animate-slide-enter stagger-150",
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }: HTMLElementProps) => (
      <ol
        className={cn(
          "my-6 ml-6 list-decimal",
          "animate-slide-enter stagger-150",
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }: HTMLElementProps) => (
      <li
        className={cn("mt-2", "animate-slide-enter stagger-150", className)}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }: HTMLElementProps) => (
      <Blockquote
        className={cn("animate-slide-enter stagger-150", className)}
        {...props}
      />
    ),
    img: ({
      src,
      alt,
      width,
      height,
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <ZoomableImage
        src={typeof src === "string" ? src : ""}
        alt={alt ?? ""}
        width={toDimension(width)}
        height={toDimension(height)}
      />
    ),
    // remark-figures pairs each `![alt](src)` with the `_caption_` line under
    // it; rehype-pretty-code emits its own <figure> around code blocks, which
    // must stay unstyled or every snippet picks up the image figure's spacing.
    figure: ({ className, ...props }: HTMLElementProps) => {
      const isCodeBlock =
        "data-rehype-pretty-code-figure" in props ||
        "data-rehype-pretty-code-fragment" in props;

      if (isCodeBlock) {
        return <figure className={cn("my-6", className)} {...props} />;
      }

      return (
        <figure
          className={cn(
            "my-8 flex flex-col items-center gap-3",
            "animate-slide-enter stagger-150",
            className
          )}
          {...props}
        />
      );
    },
    figcaption: ({ className, ...props }: HTMLElementProps) => (
      <figcaption
        className={cn(
          "max-w-prose text-center text-sm italic leading-relaxed text-muted-foreground",
          className
        )}
        {...props}
      />
    ),
    video: (props: React.VideoHTMLAttributes<HTMLVideoElement>) => (
      <div className="flex justify-center my-4 w-full">
        <video
          {...props}
          className={cn(
            "shadow-md hover:shadow-lg transition-all duration-300 rounded-lg max-w-full",
            props.className
          )}
        />
      </div>
    ),
    hr: () => <Separator className="my-6 animate-slide-enter stagger-150" />,
    table: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-y-auto">
        <table
          className={cn("w-full", "animate-slide-enter stagger-150", className)}
          {...props}
        />
      </div>
    ),
    tr: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr
        className={cn(
          "m-0 border-t p-0 even:bg-muted",
          "animate-slide-enter stagger-150",
          className
        )}
        {...props}
      />
    ),
    th: ({ className, ...props }: HTMLElementProps) => (
      <th
        className={cn(
          "border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right",
          "animate-slide-enter stagger-150",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: HTMLElementProps) => (
      <td
        className={cn(
          "border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right",
          "animate-slide-enter stagger-150",
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }: HTMLElementProps) => (
      <pre
        className={cn(
          "my-6 overflow-x-auto rounded-lg border border-border/60 bg-muted",
          "py-4 font-mono text-sm leading-relaxed",
          "animate-slide-enter stagger-150",
          className
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }: HTMLElementProps) => {
      // Inside a highlighted block, shiki has already coloured every token and
      // <pre> owns the background; the inline pill styling would draw a second
      // box around the code. rehype-pretty-code marks those with data-language.
      const isBlock = "data-language" in props;

      if (isBlock) {
        return (
          <code
            className={cn("grid font-mono text-sm", className)}
            {...props}
          />
        );
      }

      return (
        <InlineCode
          className={cn("font-normal text-foreground", className)}
          {...props}
        />
      );
    },
    Image: (props: ImageProps) => <Image {...props} />,
    Callout,
    Card: MdxCard,
    ...components,
  };
}
