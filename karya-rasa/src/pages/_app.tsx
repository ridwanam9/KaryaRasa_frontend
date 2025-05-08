import "../styles/globals.css";
import "../styles/account.css";
import "../styles/address.css";
import "../styles/bank.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
