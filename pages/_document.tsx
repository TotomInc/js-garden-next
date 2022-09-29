import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="N6sosyHR9ntKRDOF-bzLRS1Yy_Df98lyZEngPwvaqfI"
        />

        <link rel="icon" type="image/png" href="/favicon.png" />

        <script
          defer
          data-api="/stats/api/event"
          data-domain="blog.totominc.io"
          src="https://plausible.totominc.io/js/script.js"
        />
      </Head>

      <body className="text-secondary bg-background font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
