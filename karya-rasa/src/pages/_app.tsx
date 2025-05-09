import "../styles/globals.css";
import "../styles/account.css";
import "../styles/address.css";
import "../styles/bank.css";

import '@fortawesome/fontawesome-free/css/all.min.css';

import type { AppProps } from "next/app";
import { CartProvider } from '@/pages/contexts/CartContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CartProvider>
            <Component {...pageProps} />
        </CartProvider>
    );
}