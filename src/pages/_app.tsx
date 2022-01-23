import { ChakraProvider } from "@chakra-ui/react";
import NextNprogress from 'nextjs-progressbar';

import "@fontsource/inter";

import theme from "../theme";
import { AppProps } from "next/app";
import { Navbar } from "../components/layout/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <NextNprogress
                color="#0BC5EA"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
            />
            <Navbar />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
