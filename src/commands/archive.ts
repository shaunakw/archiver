import type { ICommand } from 'wokcommands';

const command: ICommand = {
    category: 'Archiver',
    description: 'Gets the link to the server archive.',
    slash: true,
    guildOnly: true,
    callback({ interaction }) {
        interaction.reply({
            content: `Access the archive at https://archiver.vercel.app/archive/${interaction.guildId}`,
            ephemeral: true,
        });
    },
};

export default command;
