import Link from 'next/link';
import { Navbar } from 'react-bootstrap';

export default function AppNavbar(): JSX.Element {
  return (
    <Navbar bg="primary" variant="dark" fixed="top" className="px-4">
      <Link href="/" passHref>
        <Navbar.Brand>Archiver Vault</Navbar.Brand>
      </Link>
    </Navbar>
  );
}