import Document, { Head, Html, Main, NextScript } from "next/document"
import React from "react"
import { defaultTheme } from "../../lib"

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
