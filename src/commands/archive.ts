import type { ICommand } from 'wokcommands';

const command: ICommand = {
    category: 'Archiver',
    description: 'Gets the link to the server archive.',
    slash: true,
    guildOnly: true,
    callback({ interaction }) {
        interaction.reply(`https://archiver.vercel.app/archive/${interaction.guildId}`);
    },
};

export default command;
