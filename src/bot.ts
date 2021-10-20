import { Client, Intents, Message, TextChannel } from 'discord.js';
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
        botOwners: process.env.DISCORD_OWNER,
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: process.env.TS_NODE === 'true',
    });

    client.user?.setActivity('/archive');
});

client.on('guildCreate', async (guild) => {
    console.log(`Joined ${guild.name}!`);
    await firebase.setupGuild(guild);
    console.log(`Setup ${guild.name}!`);
});

client.on('messageDelete', async (msg) => {
    if (msg instanceof Message && msg.channel instanceof TextChannel) {
        await firebase.uploadMessage(msg);
    }
});

client.on('messageDeleteBulk', async (msgs) => {
    for (const msg of msgs.values()) {
        if (msg instanceof Message && msg.channel instanceof TextChannel) {
            await firebase.uploadMessage(msg);
        }
    }
});

client.login(token);
