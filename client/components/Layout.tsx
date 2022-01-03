import Head from "next/head";
import React from "react";
import classNames from "../utils/classNames";
import Footer from "./Footer";
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
      </Head>

      <div className="flex flex-col h-screen justify-between">
        <header >
          <Navbar />
        </header>

        <main className={classNames("smooth dark:bg-gray-900 mt-16 min-h-container text-white")}>{children}</main>

        <footer >
          <Footer />
        </footer>
      </div>

    </div>
  );
};

export default Layout;
