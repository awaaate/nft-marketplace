import { extendTheme, ChakraTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
    heading: "Inter",
    body: "Inter",
};

const breakpoints = createBreakpoints({
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
});

const theme: Partial<ChakraTheme> = {
    colors: {
        black: "#16161D",
        gray: {
            50: "#f2f2f2",
            100: "#d9d9d9",
            200: "#bfbfbf",
            300: "#a6a6a6",
            400: "#8c8c8c",
            500: "#737373",
            600: "#595959",
            700: "#404040",
            800: "#262626",
            900: "#0d0d0d",
        },
    },
    styles: {
        global: {
            "html, body": {
                background: "whiteAlpha.700",
            },
        },
    },
    fonts,
    breakpoints,
};

export default extendTheme(theme);
