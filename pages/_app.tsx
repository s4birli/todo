import React from "react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import store from "../lib/redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
