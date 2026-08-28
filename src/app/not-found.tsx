import Link from "next/link";
import type { Metadata } from "next";
import { Muted } from "@/components/ui/typography";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * Recovery links, in the order an agent should try them. Rendered as visible
 * text rather than hidden metadata so a crawler reading the 404 body gets the
 * same map a person does.
 */
const RECOVERY_LINKS = [
  { href: "/llms.txt", label: "/llms.txt", hint: "index of every page and post" },
  { href: "/sitemap.xml", label: "/sitemap.xml", hint: "every public URL" },
  { href: "/blog", label: "/blog", hint: "all writing" },
  { href: "/openapi.json", label: "/openapi.json", hint: "machine-readable API surface" },
] as const;

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
      <p
        aria-hidden="true"
        className="animate-slide-enter text-8xl font-extrabold text-muted-foreground/20"
      >
        404
      </p>

      <h1 className="animate-slide-enter stagger-100 mt-4 text-2xl font-semibold">
        Page not found
      </h1>

      <Muted className="animate-slide-enter stagger-200 mt-2 max-w-md">
        This URL does not exist on {siteConfig.url.replace(/^https?:\/\//, "")}.
        Nothing was moved; there is no page here.
      </Muted>

      <h2 className="animate-slide-enter stagger-200 mt-8 text-sm font-medium text-muted-foreground">
        Where to look next
      </h2>

      <ul className="animate-slide-enter stagger-300 mt-3 flex flex-col gap-2 text-sm">
        {RECOVERY_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-mono text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {link.label}
            </Link>
            <span className="text-muted-foreground"> — {link.hint}</span>
          </li>
        ))}
      </ul>

      <Muted className="animate-slide-enter stagger-300 mt-6 max-w-md text-xs">
        Every page also answers <code>Accept: text/markdown</code> with a
        Markdown version of itself.
      </Muted>

      <Link
        href="/"
        className="animate-slide-enter stagger-300 mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <Icons.chevronLeft className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  );
}
