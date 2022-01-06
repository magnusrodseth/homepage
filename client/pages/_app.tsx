
import "../styles/globals.css"
import type { AppProps } from "next/app";
import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/dist/client/router";
import capitalize from "../utils/capitalize";
import { ThemeProvider } from "../utils/theme/ThemeContext";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const is404Page = router.pathname == "/404";

  const isHomePage = router.pathname == "/";

  const hasSubPage = router.pathname.split("/").length > 1;

  if (is404Page) {
    return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }

  if (isHomePage) {
    return (
      <ApolloProvider client={client}>
        <Layout title={"Home"}>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }

  if (hasSubPage) {
    const split = router.pathname.split("/");

    // A generic title, instead of trying to parse a dynamic slug
    // Example: Clicking on an employee's resume will display "Employees - SystemSoft AS"
    const title = split[1];

    return (
      <ApolloProvider client={client}>
        <Layout title={capitalize(title)}>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <Layout title={capitalize(router.pathname.substring(1))}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};
export default App;
