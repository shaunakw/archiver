import type { Guild } from 'discord.js';
import type { ICommand } from 'wokcommands';
import * as firebase from '../firebase';

const command: ICommand = {
    category: 'Archiver',
    description: 'Gives access to the archive password generator.',
    slash: true,
    guildOnly: true,
    requiredPermissions: ['MANAGE_MESSAGES'],
    async callback({ interaction }) {
        await interaction.deferReply({ ephemeral: true });

        const guild = interaction.guild as Guild;
        const secret = await firebase.getSecret(guild.id);
        const uri = `https://archiver.vercel.app/otp?secret=${secret}&account=${guild.name}`;

        await interaction.editReply(`Access the password generator at ${encodeURI(uri)}`);
    },
};

export default command;
