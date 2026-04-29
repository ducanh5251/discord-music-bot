const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const commands = [
  new SlashCommandBuilder()
    .setName('play')
    .setDescription('Phát nhạc')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('Link YouTube')
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Dừng nhạc')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('⏳ Đang tạo slash command...');

    await rest.put(
      Routes.applicationCommands('CLIENT_ID_BOT'),
      { body: commands }
    );

    console.log('✅ Đã tạo xong!');
  } catch (error) {
    console.error(error);
  }
})();
