import type { NextApiHandler } from 'next';
import * as discord from 'util/discord';

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  res.status(200).send(await discord.api(`/guilds/${id}`));
};

export default handler;