import { Flex, Heading, IconButton, Spacer } from '@chakra-ui/react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      <Spacer />
      <IconButton
        as="a"
        href="https://github.com/shaunakw/archiver"
        target="_blank"
        aria-label="View Source Code"
        icon={<FontAwesomeIcon icon={faGithub} />}
        size="xs"
        variant="link"
      />
    </Flex>
  );
}