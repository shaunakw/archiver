import { Client, Intents } from 'discord.js';
import * as dotenv from 'dotenv';
import path from 'path';
import WOKCommands from 'wokcommands';
import * as firebase from './firebase';

dotenv.config();
firebase.init();

const token = process.env.DISCORD_TOKEN ?? '';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE'],
});

client.once('ready', async () => {
    console.log(`${client.user?.tag} ready!`);

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: process.env.TS_NODE === 'true',
    });

    client.user?.setActivity('/archive');
});

client.on('messageDelete', async (msg) => {
    if (msg.guildId && msg.content) {
        await firebase.uploadMessage(msg);
        console.log('Uploaded to Firebase!');
    }
});

client.login(token);
