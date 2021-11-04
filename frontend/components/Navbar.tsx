import { Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

type NavbarProps = {
  title: string,
  showAddButton?: boolean,
};

const oauthUrl = 'https://discord.com/api/oauth2/authorize?client_id=897166166269767731&permissions=8&scope=bot%20applications.commands';

export default function AppNavbar({ title, showAddButton }: NavbarProps): JSX.Element {
  const logoSize = { width: 40, height: 40 };

  return (
    <Flex as="nav" p={4} align="center" w="100%" position="fixed" top={0} zIndex={9999} bgColor="gray.800">
      <Link href="/">
        <a style={logoSize}>
          <Image src="/favicon.png" {...logoSize} alt="" />
        </a>
      </Link>
      <Heading ms={4} size="md">{title}</Heading>
      <Spacer />
      {showAddButton && (
        <Button as="a" me={2} href={oauthUrl} target="_blank" bgColor="discord">Add to Discord</Button>
      )}
    </Flex>
  );
}