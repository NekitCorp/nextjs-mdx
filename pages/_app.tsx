import type { AppProps } from "next/app";
import React from "react";
import { createGlobalStyle } from "styled-components";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";

const GlobalStyle = createGlobalStyle`
    body{
        padding: 0;
        margin: 0;
        font-family: 'Courier New', Courier, monospace;
    }
`;

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
