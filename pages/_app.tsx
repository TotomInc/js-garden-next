import type { AppProps } from "next/app";

import "../styles/index.css";
import "../styles/fonts.css";
import "../styles/syntax.css";
import "../styles/scrollbar.css";

export function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default App;
