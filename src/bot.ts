import { Client, Intents } from 'discord.js';
import * as dotenv from 'dotenv';
import * as firebase from './firebase';

dotenv.config();
firebase.init();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE'],
});

client.once('ready', () => {
    console.log(`${client.user?.tag} ready!`);
});

client.on('messageDelete', (msg) => {
    firebase.uploadMessage(msg);
});

client.login(process.env.DISCORD_TOKEN);
