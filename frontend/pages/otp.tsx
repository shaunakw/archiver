import { Button, Box, Flex, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TOTP } from 'otpauth';
import QRCode from 'qrcode.react';
import Navbar from '../components/Navbar';

const OTP: NextPage = () => {
  const router = useRouter();
  const secret = router.query.secret?.toString();
  const account = router.query.account?.toString();

  function validateSecret(): boolean {
    if (!secret) return false;
    for (const i of secret) {
      if (!i.match(/[a-z2-7]/)) {
        return false;
      }
    }
    return true;
  }

  function getUri(): string {
    return new TOTP({
      secret: secret ?? '',
      issuer: account ? 'Archiver' : undefined,
      label: account ?? 'Archiver',
    }).toString();
  }

  return <>
    <Navbar title="Password Generator" />
    <Flex mt={28} mx={4} direction="column" align="center" textAlign="center">
      {validateSecret() ? (
        <>
          <Text fontSize="xl">Scan the below QR code with a two-factor authenticator app like Google Authenticator.</Text>
          <Box mt={16} p={4} bgColor="white" borderRadius="1rem">
            <QRCode value={getUri()} size={240} />
          </Box>
        </>
      ) : (
        <>
          <Text fontSize="xl">Invalid secret.</Text>
          <Link href="/" passHref>
            <Button as="a" mt={16} target="_blank">Return Home</Button>
          </Link>
        </>
      )}
    </Flex> 
  </>;
};

export default OTP;
