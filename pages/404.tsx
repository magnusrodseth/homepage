import classNames from "../utils/classNames";
import React from "react";
import Head from "next/head";
import ReturnButton from "../components/ReturnButton";

const Custom404 = () => {
  return (
    <div>
      <Head>
        <title>404 | Page Not Found</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/img/logo.png" />
      </Head>

      <div
        className={classNames(
          "flex justify-center items-center flex-col h-screen",
          "bg-404 bg-cover bg-center"
        )}
      >
        <div className="flex flex-row mb-5">
          <h1 className="mr-2 text-3xl">
            404 <span className="m-2 text-4xl">|</span> Page Not Found
          </h1>
        </div>
        <ReturnButton name="homepage" link="" />
      </div>
    </div>
  );
};

export default Custom404;
