import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Navbar from 'components/Navbar';

const Home: NextPage = () => {
  const oauthUrl = 'https://discord.com/api/oauth2/authorize?client_id=897166166269767731&permissions=8&scope=bot%20applications.commands';

  return <>
    <Navbar title="" />
    <Flex mt={28} mx={4} direction="column" align="center" textAlign="center">
      <Heading size="2xl" fontWeight="semibold">Archiver</Heading>
      <Text mt={8} fontSize="xl">Securely archive deleted messages in Discord.</Text>
      <Button as="a" mt={20} href={oauthUrl} target="_blank" bgColor="discord">Add to Discord</Button>
    </Flex>
  </>;
};

export default Home;
