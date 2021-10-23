import axios from 'axios';
import crypto from 'crypto';
import type { Guild, Message, TextChannel } from 'discord.js';
import * as admin from 'firebase-admin';

function generateSecret(): string {
    const alphabet='abcdefghijklmnopqrstuvwxyz234567';
    const bytes = crypto.randomBytes(32);

    let secret = '';
    for (const i of bytes) {
        secret += alphabet[i % 32];
    }

    return secret;
}

export function init(): void {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    admin.firestore().settings({
        ignoreUndefinedProperties: true,
    });
}

export async function setupGuild(guild: Guild): Promise<void> {
    await admin.firestore().collection(guild.id).doc('key').create({
        secret: generateSecret(),
    });
}

export async function getSecret(id: string): Promise<string> {
    const doc = await admin.firestore().collection(id).doc('key').get();
    return doc.get('secret');
}

export async function uploadMessage(msg: Message): Promise<void> {
    const attachment = msg.attachments.first();
    await admin.firestore().collection(msg.guildId ?? '').doc(msg.id).create({
        author: msg.author.tag,
        authorId: msg.author.id,
        channel: (msg.channel as TextChannel).name,
        channelId: msg.channelId,
        content: msg.cleanContent,
        timestamp: msg.createdTimestamp,
        attachment: attachment ? {
            name: attachment.name,
            contentType: attachment.contentType,
        } : undefined,
    });
    if (attachment) {
        const res = await axios.get<ArrayBuffer>(attachment.url, { responseType: 'arraybuffer' });
        admin.storage().bucket().file(`${msg.id}/${attachment.name}`).save(Buffer.from(res.data));
    }
}
