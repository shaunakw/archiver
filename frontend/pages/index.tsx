import { Code, Flex, Heading, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Navbar from '../components/Navbar';

const Home: NextPage = () => {
  return <>
    <Navbar title="" showAddButton />
    <Flex mt={28} mx={4} direction="column" align="center" textAlign="center">
      <Heading size="2xl" fontWeight="semibold">Archiver</Heading>

      <Text mt={8} fontSize="xl">Securely archive deleted messages in Discord.</Text>

      <Heading mt={20} fontWeight="semibold">Commands</Heading>

      <Code mt={8} fontSize="xl" fontWeight="semibold">/archive</Code>
      <Text mt={4}>Get a link to the server archive.</Text>

      <Code mt={8} fontSize="xl" fontWeight="semibold">/password</Code>
      <Text mt={4} textStyle="detail" color="gray.400">Requires the Manage Messages permission</Text>
      <Text mt={2}>Get a link to the password generator (will require a 2-factor authentication app like Google Authenticator).</Text>
    </Flex>
  </>;
};

export default Home;
