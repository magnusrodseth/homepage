import { siteConfig } from "@/config/site";

/**
 * Single source of truth for the site's top-level pages.
 *
 * Everything that needs to know a page's title, tagline, or location derives it
 * from here: the navigation bar, the sitemap, the RSS/Atom feeds, the Markdown
 * representations served at /md, and the llms.txt index. Add a page once and it
 * propagates everywhere.
 */
export type SitePage = {
  /** Route path, e.g. "/blog". The home page is "/". */
  path: string;
  /** Short title used in nav, page headings, and metadata. */
  title: string;
  /** One-line tagline shown under the heading and reused in feeds and Markdown. */
  tagline: string;
  /** Show in the primary navigation. */
  nav: boolean;
  /** Include in the XML sitemap and the agent-facing site map. */
  sitemap: boolean;
  /** Expose a Markdown representation under /md and via `Accept: text/markdown`. */
  markdown: boolean;
  /** Absolute URL for external destinations (e.g. presentations). Overrides `path` for links. */
  href?: string;
};

export const HOME_PAGE: SitePage = {
  path: "/",
  title: siteConfig.name,
  tagline: siteConfig.description,
  nav: false,
  sitemap: true,
  markdown: true,
};

export const PROJECTS_PAGE: SitePage = {
  path: "/projects",
  title: "Projects",
  tagline: "A collection of professional work and open source projects.",
  nav: true,
  sitemap: true,
  markdown: true,
};

export const BLOG_PAGE: SitePage = {
  path: "/blog",
  title: "Blog",
  tagline: "Thoughts on software, AI, and building things.",
  nav: true,
  sitemap: true,
  markdown: true,
};

export const DAILY_DRIVERS_PAGE: SitePage = {
  path: "/daily-drivers",
  title: "Daily drivers",
  tagline: "The hardware, software, and tools I use day to day.",
  nav: true,
  sitemap: true,
  markdown: true,
};

export const PRESENTATIONS_PAGE: SitePage = {
  path: siteConfig.presentations,
  title: "Presentations",
  tagline: "Slide decks and talks.",
  nav: true,
  sitemap: false,
  markdown: false,
  href: siteConfig.presentations,
};

export const sitePages: SitePage[] = [
  HOME_PAGE,
  PROJECTS_PAGE,
  BLOG_PAGE,
  DAILY_DRIVERS_PAGE,
  PRESENTATIONS_PAGE,
];

/** Pages shown in the primary navigation, in order. */
export const navPages = sitePages.filter((page) => page.nav);

/** Pages included in the XML sitemap. */
export const sitemapPages = sitePages.filter((page) => page.sitemap);

/** Resolve a page's link target, preferring an explicit external href. */
export const pageHref = (page: SitePage): string => page.href ?? page.path;
