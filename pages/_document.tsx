import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html
      lang="en"
      className="text-secondary bg-background font-sans antialiased"
    >
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
