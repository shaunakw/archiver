import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from 'components/Navbar';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Archiver Vault</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
    </>
  );
};

export default Home;
