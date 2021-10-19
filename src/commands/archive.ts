import { ICommand } from 'wokcommands';

const command: ICommand = {
    category: 'Archiver',
    description: 'Gets the link to the server archive.',
    slash: true,
    callback: ({ interaction }) => {
        return `Archive: https://archiver.vercel.app/archive/${interaction.guildId}`;
    },
};

export default command;
