import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CodeInput from 'react-verification-code-input';
import { useState } from 'react';
import Navbar from 'components/Navbar';
import styles from 'styles/Archive.module.css';

type ArchiveProps = {
  name: string,
};

type AuthState = 'ready' | 'loading' | 'error';

type Message = {
  id: string,
  author: string,
  content: string,
  timestamp: number,
};

const url = process.env.NODE_ENV === 'production' ? 'https://archiver.vercel.app' : 'http://localhost:3000';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${url}/api/guilds/${context.params?.id}`);
  const json = await res.json();
  if (json.name) {
    return {
      props: { name: json.name }, 
    };
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

const Archive: NextPage<ArchiveProps> = ({ name }) => {
  const router = useRouter();
  const id = router.query.id;

  const [state, setState] = useState<AuthState>('ready');
  const [messages, setMessages] = useState<Message[]>();

  async function submitCode(code: string) {
    setState('loading');
    const res = await fetch(`/api/archive/${id}`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
    
    if (res.status === 200) {
      setState('ready');
      setMessages(await res.json());
    } else {
      setState('error');
    }
  }

  return (
    <>
      <Head>
        <title>Archiver Bot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {messages ? (
        <div className={styles.messages}>
          {messages.map((msg) => (
            <div key={msg.id} className="p-3">
              <p><b>{msg.author}</b> {new Date(msg.timestamp).toString()}</p>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={`d-flex flex-column align-items-center ${styles.login}`}>
          <h1>Enter Code</h1>
          <CodeInput
            loading={state === 'loading'}
            fieldWidth={48}
            fieldHeight={44}
            onComplete={submitCode}
            className="mt-4" />
          {state == 'error' && (
            <p className="text-danger">Invalid Code.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Archive;
