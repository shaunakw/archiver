import admin from 'firebase-admin';
import { TOTP } from 'otpauth';
import * as discord from './discord';

type User = {
  author: string,
  avatar: string,
}

type Message = User & {
  id: string,
  channel: string,
  content: string,
  timestamp: number,
}

export function init(): void {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    });
  }
}

export async function getOTP(id: string): Promise<TOTP> {
  const doc = await admin.firestore().collection(id).doc('key').get();
  return new TOTP({ secret: doc.get('secret') });
}

export async function getMessages(id: string): Promise<Message[]> {
  const collection = await admin.firestore().collection(id).orderBy('timestamp', 'desc').get();
  const userCache = new Map<string, User>();
  const messages: Message[] = [];

  for (const i of collection.docs) {
    const { authorId, content, channel, timestamp } = i.data();
    if (!userCache.has(authorId)) {
      const user = await discord.api(`/users/${authorId}`);
      const avatarEndpoint = user.avatar
        ? `/avatars/${user.id}/${user.avatar}.png`
        : `/embed/avatars/${parseInt(user.discriminator) % 5}.png`;
      
      userCache.set(authorId, {
        author: `${user.username}#${user.discriminator}`,
        avatar: `https://cdn.discordapp.com${avatarEndpoint}`,
      });
    }
    messages.push({
      ...userCache.get(authorId) as User,
      id: i.id,
      channel,
      content,
      timestamp,
    });
  }

  return messages;
}