import type { Guild } from 'discord.js';
import type { ICommand } from 'wokcommands';
import * as firebase from '../firebase';

const command: ICommand = {
    category: 'Archiver',
    description: 'Gives access to the archive password.',
    slash: true,
    guildOnly: true,
    async callback({ interaction }) {
        if (interaction.memberPermissions?.has('MANAGE_MESSAGES')) {
            const guild = interaction.guild as Guild;
            const secret = await firebase.getSecret(guild.id);
            interaction.reply({
                content: encodeURI(`https://archiver.vercel.app/otp?secret=${secret}&account=${guild.name}`),
                ephemeral: true,
            });
        } else {
            interaction.reply({
                content: 'You need the Manage Messages permission to perform this command.',
                ephemeral: true,
            });
        }
    },
};

export default command;
