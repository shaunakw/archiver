import * as admin from 'firebase-admin';
import type { NextApiHandler } from 'next';
import { TOTP } from 'otpauth';
import * as discord from 'util/discord';
import * as firebase from 'util/firebase';

type User = {
  author: string,
  avatar: string,
}

type Message = User & {
  id: string,
  content: string,
  timestamp: number,
}

const otp = new TOTP({ secret: process.env.OTP_SECRET });

function validateCode(code: string): boolean {
  return otp.generate() === code;
}

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  if (req.method == 'POST') {
    const body = JSON.parse(req.body);
    if (process.env.NODE_ENV === 'development' || validateCode(body.code)) {
      firebase.init();

      const query = await admin.firestore().collection(id).orderBy('timestamp', 'desc').get();
      const userCache = new Map<string, User>();
      const messages: Message[] = [];

      for (const i of query.docs) {
        const { authorId, content, timestamp } = i.data();
        if (!userCache.has(authorId)) {
          const user = await discord.api(`/users/${authorId}`);
          userCache.set(authorId, {
            author: `${user.username}#${user.discriminator}`,
            avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
          });
        }
        messages.push({
          ...userCache.get(authorId) as User,
          id: i.id,
          content,
          timestamp,
        });
      }

      res.status(200).send(messages);
    } else {
      res.status(401).end();
    }
  } else {
    res.status(405).end();
  }
};

export default handler;
