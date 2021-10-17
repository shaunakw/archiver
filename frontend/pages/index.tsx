import type { NextPage } from 'next';
import Navbar from 'components/Navbar';
import { Button } from 'react-bootstrap';

const Home: NextPage = () => {
  return <>
    <Navbar title="Archiver" />
    <div className="main">
      <h1>Archiver</h1>
      <p className="lead">Securely archive deleted messages in Discord.</p>
      <Button
        variant="secondary"
        href="https://discord.com/api/oauth2/authorize?client_id=897166166269767731&permissions=8&scope=bot%20applications.commands"
        target="_blank"
        className="mt-5">
        Add to Discord
      </Button>
    </div>
  </>;
};

export default Home;
