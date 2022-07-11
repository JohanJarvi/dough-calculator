import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

/** TODO: Proper brand stuff later */
// const colors = {
//   brand: {
//     900: "#1a365d",
//     800: "#153e75",
//     700: "#2a69ac",
//   },
// };

// const styles = {
//   global: {
//     body: {
//       bg: "#123fad",
//     },
//   },
// };

// const theme = extendTheme({ colors, styles });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ChakraProvider theme={theme}> FIXME: Add brand stuff
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
