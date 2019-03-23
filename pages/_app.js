import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import "./main.scss";
import Include from "./Include";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  state = {};

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Dating</title>
          <meta name="description" content="This is the description" />
        </Head>
        <Include>
          <Component {...pageProps} />
        </Include>
      </Container>
    );
  }
}
export default MyApp;
