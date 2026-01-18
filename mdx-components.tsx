import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { cn } from "./src/lib/utils";
import { Callout } from "./src/components/callout";
import { MdxCard } from "./src/components/mdx-card";
import {
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  P,
  Small,
} from "./src/components/ui/typography";
import { Separator } from "./src/components/ui/separator";

type HTMLElementProps = React.HTMLAttributes<HTMLElement>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }: HTMLElementProps) => (
      <H1
        className={cn(
          "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
          "animate-slide-enter delay-300",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: HTMLElementProps) => (
      <H2
        className={cn("mb-0", "animate-slide-enter delay-300", className)}
        {...props}
      />
    ),
    h3: ({ className, ...props }: HTMLElementProps) => (
      <H3
        className={cn("animate-slide-enter delay-300", className)}
        {...props}
      />
    ),
    h4: ({ className, ...props }: HTMLElementProps) => (
      <H4
        className={cn("animate-slide-enter delay-300", className)}
        {...props}
      />
    ),
    h5: ({ className, ...props }: HTMLElementProps) => (
      <H4
        className={cn(
          "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
          "animate-slide-enter delay-300",
          className
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }: HTMLElementProps) => (
      <H4
        className={cn(
          "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
          "animate-slide-enter delay-300",
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
      const isInternal = href?.startsWith("/");

      return (
        <Link
          href={href ?? ""}
          target={!isInternal ? "_blank" : undefined}
          className={cn(
            "font-medium underline underline-offset-4",
            "animate-slide-enter delay-300",
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
        className={cn("animate-slide-enter delay-300", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }: HTMLElementProps) => (
      <ul
        className={cn(
          "my-6 ml-6 list-disc",
          "animate-slide-enter delay-300",
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }: HTMLElementProps) => (
      <ol
        className={cn(
          "my-6 ml-6 list-decimal",
          "animate-slide-enter delay-300",
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }: HTMLElementProps) => (
      <li
        className={cn("mt-2", "animate-slide-enter delay-300", className)}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }: HTMLElementProps) => (
      <Blockquote
        className={cn("animate-slide-enter delay-300", className)}
        {...props}
      />
    ),
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <span className="flex flex-col justify-center items-center my-4 max-w-4xl mx-auto w-full">
        <Image
          src={props.src ?? ""}
          width={700}
          height={600}
          alt={props.alt ?? ""}
          className="object-cover my-2 mx-auto shadow-md hover:shadow-lg transition-all duration-300 rounded-lg"
        />
        {props.alt && (
          <Small className="my-2 text-center block italic w-10/12">
            {props.alt}
          </Small>
        )}
      </span>
    ),
    hr: () => <Separator className="my-6 animate-slide-enter delay-300" />,
    table: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-y-auto">
        <table
          className={cn("w-full", "animate-slide-enter delay-300", className)}
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
          "animate-slide-enter delay-300",
          className
        )}
        {...props}
      />
    ),
    th: ({ className, ...props }: HTMLElementProps) => (
      <th
        className={cn(
          "border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right",
          "animate-slide-enter delay-300",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: HTMLElementProps) => (
      <td
        className={cn(
          "border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right",
          "animate-slide-enter delay-300",
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }: HTMLElementProps) => (
      <InlineCode className={cn(className)} {...props} />
    ),
    code: ({ className, ...props }: HTMLElementProps) => (
      <code
        className={cn(
          "relative text-primary/80 px-[0.3rem] py-[0.2rem] font-mono text-sm",
          "animate-slide-enter delay-300",
          className
        )}
        {...props}
      />
    ),
    Image: (props: ImageProps) => <Image {...props} />,
    Callout,
    Card: MdxCard,
    ...components,
  };
}
