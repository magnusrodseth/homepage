import type { Metadata } from "next";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import Navbar from "@/components/navigation/navbar";
import GridBackground from "@/components/grid-background";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: `${siteConfig.name} RSS feed` },
      ],
      "application/atom+xml": [
        { url: "/atom.xml", title: `${siteConfig.name} Atom feed` },
      ],
    },
  },
  appleWebApp: {
    title: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          GeistSans.className,
          "bg-background font-sans antialiased"
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>

        <Navbar />

        <GridBackground />
        <div className="md:container">
          <main
            id="main-content"
            className="flex-1 min-h-screen my-8 px-4 sm:px-6 lg:px-8"
          >
            {children}
          </main>

          <SiteFooter />
        </div>

        <Analytics />
      </body>
    </html>
  );
}
