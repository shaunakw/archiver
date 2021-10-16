import { SlashCommandBuilder } from '@discordjs/builders';

const archive = new SlashCommandBuilder()
    .setName('archive')
    .setDescription('Gets the link to the server archive.');

export default [archive.toJSON()];
