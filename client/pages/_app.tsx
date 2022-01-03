import "../styles/globals.css"
import type { AppProps } from "next/app";
import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/dist/client/router";
import capitalize from "../utils/capitalize";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const is404Page = router.pathname == "/404";

  const isHomePage = router.pathname == "/";

  const hasSubPage = router.pathname.split("/").length > 1;

  if (is404Page) {
    return <Component {...pageProps} />;
  }

  if (isHomePage) {
    return (
      <Layout title={"Home"}>
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
      <Layout title={capitalize(title)}>
        <Component {...pageProps} />
      </Layout>
    );
  }

  return (
    <Layout title={capitalize(router.pathname.substring(1))}>
      <Component {...pageProps} />
    </Layout>
  );
};
export default App;
