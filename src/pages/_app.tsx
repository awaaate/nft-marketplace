import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/inter"

import theme from "../theme";
import { AppProps } from "next/app";
import { Navbar } from "../components/layout/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <Navbar />
             <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
