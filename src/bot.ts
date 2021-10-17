import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, Intents } from 'discord.js';
import * as dotenv from 'dotenv';
import commands from './commands';
import * as firebase from './firebase';

dotenv.config();
firebase.init();

const token = process.env.DISCORD_TOKEN ?? '';
const appId = process.env.DISCORD_APP_ID ?? '';
const archiveUrl = 'https://archiver.vercel.app';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE'],
});

const rest = new REST({ version: '9' }).setToken(token);

async function registerCommands() {
    await rest.put(
        Routes.applicationCommands(appId),
        { body: commands }
    );
}

client.once('ready', async () => {
    console.log(`${client.user?.tag} ready!`);

    await registerCommands();
    console.log('Commands registered!');

    client.user?.setActivity('/archive');
    console.log('Activity set!');
});

client.on('messageDelete', async (msg) => {
    await firebase.uploadMessage(msg);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guild) return;

    if (interaction.commandName === 'archive') {
        await interaction.reply(`Archive: ${archiveUrl}/${interaction.guildId}`);
    }
});

client.login(token);
