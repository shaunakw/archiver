import type { Guild } from 'discord.js';
import { TOTP } from 'otpauth';
import type { ICommand } from 'wokcommands';
import * as firebase from '../firebase';

const command: ICommand = {
    category: 'Archiver',
    description: 'Gets the current archive password.',
    slash: true,
    guildOnly: true,
    requiredPermissions: ['MANAGE_MESSAGES'],
    async callback({ interaction }) {
        await interaction.deferReply({ ephemeral: true });

        const guild = interaction.guild as Guild;
        const otp = new TOTP({ secret: await firebase.getSecret(guild.id) })
        const password = otp.generate();

        await interaction.editReply(`Password: ${password}`);
    },
};

export default command;
