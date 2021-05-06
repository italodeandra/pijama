import Document, { Head, Html, Main, NextScript } from "next/document"
import { defaultTheme } from "../../lib"
import React from "react"

// noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {
  render() {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta content={defaultTheme.color.primary} name="theme-color" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
