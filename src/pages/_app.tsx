import "@/styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {fontMono, fontSans} from "@/config/fonts";
import type {AppProps} from "next/app";

export default function App({Component, pageProps}: AppProps) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute={"class"} defaultTheme={"dark"}>
                <Component {...pageProps} />
            </NextThemesProvider>
        </NextUIProvider>
    );
}

export const fonts = {
    sans: fontSans.style.fontFamily,
    mono: fontMono.style.fontFamily,
};