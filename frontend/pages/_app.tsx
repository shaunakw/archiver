import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/globals.scss';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <>
    <Head>
      <title>Archiver Bot</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Component {...pageProps} />
  </>;
}
