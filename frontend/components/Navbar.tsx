import { Navbar } from 'react-bootstrap';

type NavbarProps = {
  title: string,
};

export default function AppNavbar({ title }: NavbarProps): JSX.Element {
  return (
    <Navbar bg="primary" variant="dark" fixed="top" className="px-4">
      <Navbar.Brand>{title}</Navbar.Brand>
    </Navbar>
  );
}