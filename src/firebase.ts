import type { Message, PartialMessage } from 'discord.js';
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
    msg = await msg.fetch();
    await admin.firestore().collection('messages').doc(msg.id).create({
        author: msg.author?.tag,
        content: msg.content,
        timestamp: msg.createdTimestamp
    });
}
