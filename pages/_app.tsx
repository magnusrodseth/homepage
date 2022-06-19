
import "../styles/globals.css"
import "../styles/codeblock.css"
import type { AppProps } from "next/app";
import React from "react";
import Layout from "../src/components/Layout";
import { useRouter } from "next/dist/client/router";
import capitalize from "../src/utils/capitalize";
import ReactGA from "react-ga"
import useTheme from "@/hooks/useTheme";

const App = ({ Component, pageProps }: AppProps) => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "")

  const router = useRouter();

  ReactGA.pageview(router.asPath)

  const is404Page = router.pathname == "/404";

  const isHomePage = router.pathname == "/";

  const hasSubPage = router.pathname.split("/").length > 1;

  const theme = useTheme()

  if (is404Page) {
    return (
      <Component {...pageProps} />
    );
  }

  if (isHomePage) {
    return (
      <Layout title={"Home"} theme={theme}>
        <Component {...pageProps} />
      </Layout>
    );
  }


  if (hasSubPage) {
    const split = router.pathname.split("/");

    // A generic title, instead of trying to parse a dynamic slug
    // Example: Clicking on an employee's resume will display "Employees - SystemSoft AS"
    const title = split[1];

    return (
      <Layout title={capitalize(title)} theme={theme}>
        <Component {...pageProps} />
      </Layout>
    );
  }

  return (
    <Layout title={capitalize(router.pathname.substring(1))} theme={theme}>
      <Component {...pageProps} />
    </Layout>
  );
};
export default App;
