import { Client, Intents } from 'discord.js';
import * as firebase from './firebase';
import { token } from './config.json';

firebase.init();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log(`${client.user?.tag} ready!`);
});

client.on('messageDelete', (msg) => {
    firebase.uploadMessage(msg);
});

client.login(token);
