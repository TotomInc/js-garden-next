import { Html, Head, Main, NextScript } from "next/document";

export function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="N6sosyHR9ntKRDOF-bzLRS1Yy_Df98lyZEngPwvaqfI"
        />

        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <body className="text-secondary bg-background font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
