import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.filter%2CArray.prototype.forEach%2CArray.prototype.map%2CPromise%2Ces2017" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
