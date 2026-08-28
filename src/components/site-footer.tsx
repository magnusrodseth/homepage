import { cn } from "@/lib/utils";
import Link from "next/link";
import Socials from "./socials";
import BackToTop from "./back-to-top";
import { siteConfig } from "@/config/site";

/**
 * `/docs` and `/llms.txt` are listed here rather than only in `.well-known`
 * documents: an agent that reads the page still finds them, and a person
 * curious about how the site is built has somewhere to click.
 */
const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/docs", label: "API docs" },
  { href: "/llms.txt", label: "llms.txt" },
] as const;

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col gap-6 py-10 md:py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()}.{" "}
            <Link
              href={siteConfig.url}
              className="font-medium underline underline-offset-4"
            >
              Magnus Rødseth
            </Link>
            . All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <BackToTop />
            <Socials />
          </div>
        </div>

        <nav
          aria-label="Site information"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-start"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
