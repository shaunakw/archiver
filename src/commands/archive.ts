import { ICommand } from 'wokcommands';

const command: ICommand = {
    category: 'Archiver',
    description: 'Gets the link to the server archive.',
    slash: true,
    callback({ interaction }) {
        if (interaction.inGuild()) {
            return `https://archiver.vercel.app/archive/${interaction.guildId}`;
        }
    },
};

export default command;
