import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.css';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return <>
    <Head>
      <title>Archiver Bot</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </>;
}

export default App;
