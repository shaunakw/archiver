import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const theme = extendTheme({
    config: {
      initialColorMode: 'dark',
    },
    fonts: {
      heading: 'Poppins',
      body: 'Poppins',
    },
    colors: {
      discord: '#5865f2',
    },
    fontWeights: {
      medium: 600,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Archiver Bot</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
