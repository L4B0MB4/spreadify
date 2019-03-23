import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { withRouter } from "next/router";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return Document.getInitialProps(ctx);
  }

  render() {
    // make the environment available on the client
    const envScript = `window.ENV = '${process.env.WILD_ENV ||
      "development"}';`;
    return (
      <html lang="en">
        <Head id="deferred-styles">
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <script dangerouslySetInnerHTML={{ __html: envScript }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default withRouter(MyDocument);
