import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from 'react-bootstrap';

type NavbarProps = {
  title: string,
};

export default function AppNavbar({ title }: NavbarProps): JSX.Element {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="px-4">
      <Navbar.Brand>
        <Link href="/">
          <a className="d-inline-block align-middle me-2">
            <Image src="/favicon.png" width={36} height={36} alt="" />
          </a>
        </Link>
        {' '}{title}
      </Navbar.Brand>
    </Navbar>
  );
}