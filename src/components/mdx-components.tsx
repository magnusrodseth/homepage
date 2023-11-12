import * as React from "react";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

import { cn } from "@/lib/utils";
import { Callout } from "@/components/callout";
import { MdxCard } from "@/components/mdx-card";
import Link from "next/link";
import { Blockquote, H1, H2, H3, H4, InlineCode, P } from "./ui/typography";
import { Separator } from "./ui/separator";

type HTMLElementProps = React.HTMLAttributes<HTMLElement>;

const components = {
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
    <H3 className={cn("animate-slide-enter delay-300", className)} {...props} />
  ),
  h4: ({ className, ...props }: HTMLElementProps) => (
    <H4 className={cn("animate-slide-enter delay-300", className)} {...props} />
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
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link
      href={props.href ?? ""}
      target="_blank"
      className={cn(
        "font-medium underline underline-offset-4",
        "animate-slide-enter delay-300",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: HTMLElementProps) => (
    <P
      className={cn("mt-0 mb-4", "animate-slide-enter delay-300", className)}
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
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn(
        "rounded-md border",
        "animate-slide-enter delay-300",
        className
      )}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <Separator className="my-6 animate-slide-enter delay-300" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn("w-full", "animate-slide-enter delay-300", className)}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
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
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        "animate-slide-enter delay-300",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: HTMLElementProps) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
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
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        "animate-slide-enter delay-300",
        className
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  Card: MdxCard,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
