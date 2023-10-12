import type { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";

import "../styles/index.css";
import "../styles/fonts.css";
import "../styles/syntax.css";
import "../styles/scrollbar.css";

export function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider
      domain="jsgarden.co"
      customDomain="https://hello.jsgarden.co"
      scriptProps={{ src: "/js/hello-core.js" }}
      selfHosted
    >
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}

export default App;
