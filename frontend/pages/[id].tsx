import { Avatar, Box, CircularProgress, Flex, Heading, HStack, Link, PinInput, PinInputField, Text } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Linkify from 'react-linkify';
import Navbar from 'components/Navbar';

type ArchiveProps = {
  name: string,
};

type AuthState = 'ready' | 'loading' | 'error';

type Message = {
  id: string,
  author: string,
  avatar: string,
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

  function linkify(href: string, text: string, key: number) {
    return (
      <Link href={href} key={key} color="blue.300" isExternal>{text}</Link>
    );
  }

  async function submitCode(code: string) {
    setState('loading');
    const res = await fetch(`/api/archive/${id}`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
    
    if (res.status === 200) {
      setState('ready');
      setMessages(await res.json());
    } else if (res.status === 401) {
      setState('error');
    }
  }

  return <>
    <Navbar title={`${name} Archive`} />
    {messages ? (
      <Box mt={20} mb={4} mx={4}>
        {messages.map((msg) => (
          <Flex key={msg.id} mt={6} align="start">
            <Avatar name={msg.author} src={msg.avatar} bg="transparent" />
            <Box ms={4}>
              <p>
                <b>{msg.author}</b>
                <Text as="span" textStyle="detail" color="gray.400" ms={4}>
                  {new Date(msg.timestamp).toLocaleString()}
                </Text>
              </p>
              <p>
                <Linkify componentDecorator={linkify}>{msg.content}</Linkify>
              </p>
            </Box>
          </Flex>
        ))}
      </Box>
    ) : (
      <Flex mt={28} mx={4} direction="column" align="center" textAlign="center">
        <Heading size="2xl" fontWeight="medium">Enter Code</Heading>
        <HStack mt={8}>
          <PinInput otp placeholder="" isDisabled={state === 'loading'} onComplete={submitCode}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
          {state === 'loading' && (
            <CircularProgress
              m="0 !important"
              size={6}
              left="50%"
              transform="translate(-50%, 0)"
              color="white"
              trackColor="transparent"
              position="absolute"
              isIndeterminate
            />
          )}
        </HStack>
        {state === 'error' && (
          <Text mt={4} color="red.300">Invalid Code.</Text>
        )}
      </Flex>
    )}
  </>;
};

export default Archive;
