import { ICommand } from 'wokcommands';
import * as firebase from '../firebase';

const command: ICommand = {
    category: 'Archiver',
    description: 'Gives access to the archive password.',
    slash: true,
    async callback({ interaction }) {
        if (interaction.inGuild()) {
            const secret = await firebase.getSecret(interaction.guildId);
            return encodeURI(`https://archiver.vercel.app/otp?secret=${secret}&account=${interaction.guild?.name}`);
        }
    },
};

export default command;
