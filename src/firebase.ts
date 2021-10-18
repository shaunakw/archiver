import type { Message, PartialMessage, TextChannel } from 'discord.js';
import * as admin from 'firebase-admin';

export function init(): void {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }),
    });
}

export async function uploadMessage(msg: Message | PartialMessage): Promise<void> {
    await admin.firestore().collection(msg.guildId ?? '').doc(msg.id).create({
        author: msg.author?.tag,
        authorId: msg.author?.id,
        channel: (msg.channel as TextChannel).name,
        content: msg.content,
        timestamp: msg.createdTimestamp
    });
}
