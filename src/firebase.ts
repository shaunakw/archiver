import type { Message, PartialMessage } from 'discord.js';
import * as admin from 'firebase-admin';
import { serviceAccount } from './config.json';

export function init(): void {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key,
        }),
    });
}

export async function uploadMessage(msg: Message | PartialMessage): Promise<void> {
    admin.firestore().collection('messages').doc(msg.id).create({
        author: msg.author?.tag,
        content: msg.content,
        timestamp: msg.createdTimestamp
    });
}
