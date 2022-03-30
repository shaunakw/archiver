import { Button, Code, Flex, Heading, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Navbar from '../components/Navbar';

const oauthUrl = 'https://discord.com/api/oauth2/authorize?client_id=897166166269767731&permissions=8&scope=bot%20applications.commands';

const Home: NextPage = () => {
  return <>
    <Navbar title="" />
    <Flex mt={24} mx="auto" p={4} maxWidth={800} direction="column" align="center" textAlign="center">
      <Heading size="2xl" fontWeight="semibold">Archiver</Heading>

      <Text mt={8} fontSize="xl">Securely archive deleted messages in Discord.</Text>
      <Button as="a" mt={12} href={oauthUrl} target="_blank" bgColor="discord">Add to Discord</Button>

      <Heading mt={20} fontWeight="semibold">Commands</Heading>

      <Code mt={8} fontSize="xl" fontWeight="semibold">/archive</Code>
      <Text mt={4}>Get a link to the server archive.</Text>

      <Code mt={8} fontSize="xl" fontWeight="semibold">/password</Code>
      <Text mt={4} textStyle="detail" color="gray.400">Required permissions: Manage Messages</Text>
      <Text mt={2}>Get the current archive password.</Text>

      <Code mt={8} fontSize="xl" fontWeight="semibold">/passgen</Code>
      <Text mt={4} textStyle="detail" color="gray.400">Required permissions: Manage Messages</Text>
      <Text mt={2}>Get a link to the password generator (will require a 2-factor authentication app like Google Authenticator).</Text>
    </Flex>
  </>;
};

export default Home;
