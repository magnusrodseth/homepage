import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import Navbar from "@/components/navigation/navbar";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import GridBackground from "@/components/grid-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
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
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          inter.className,
          "bg-background font-sans antialiased"
        )}
      >
        <ThemeProvider attribute="class" forcedTheme="dark">
          <Navbar />

          <GridBackground />
          <div className="md:container">
            <main className="flex-1 min-h-screen my-8 px-4 sm:px-6 lg:px-8">
              {children}
            </main>

            <SiteFooter />
            <Toaster richColors />

            {/* <Analytics /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
