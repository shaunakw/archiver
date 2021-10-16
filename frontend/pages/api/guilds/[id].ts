import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  const guild = await fetch(`https://discord.com/api/v9/guilds/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
      'User-Agent': 'DiscordBot',
    },
  });
  res.status(200).send(await guild.json());
};

export default handler;