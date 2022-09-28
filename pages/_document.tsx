import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html
      lang="en"
      className="text-secondary bg-background font-sans antialiased"
    >
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <script
          defer
          data-domain="blog.totominc.io"
          src="https://plausible.totominc.io/js/plausible.js"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
