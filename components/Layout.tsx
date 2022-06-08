import Head from "next/head";
import Script from "next/script";
import React from "react";
import classNames from "../utils/classNames";
import Footer from "./footer/Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: any;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="👋🏼 My personal website."
        />
        <meta name="keywords" content="Software, Engineering, Norway, Blog, Projects, NTNU, Web, Full-stack, GitHub, LinkedIn" />

        <link rel="icon" href="/img/logo.png" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
        </Script>
      </Head>

      <div className="">
        <header >
          <Navbar />
        </header>

        <main className={classNames(
          "smooth dark:bg-gray-900 py-16 min-h-screen h-full dark:text-white")}>
          {children}
        </main>

        <footer >
          <Footer />
        </footer>
      </div>

    </div>
  );
};

export default Layout;
