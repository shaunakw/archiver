import { Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

type NavbarProps = {
  title: string,
};

export default function AppNavbar({ title }: NavbarProps): JSX.Element {
  const logoSize = { width: 40, height: 40 };

  return (
    <Flex as="nav" p={4} align="center" w="100%" position="fixed" top={0} zIndex={9999} bgColor="gray.800">
      <Link href="/">
        <a style={logoSize}>
          <Image src="/favicon.png" {...logoSize} alt="" />
        </a>
      </Link>
      <Heading ms={4} size="md">{title}</Heading>
    </Flex>
  );
}