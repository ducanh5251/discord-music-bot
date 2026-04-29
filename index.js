const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('play-dl');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

const player = createAudioPlayer();

client.once('ready', () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

// Slash command
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'play') {
    const url = interaction.options.getString('url');

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply('❌ Bạn phải vào voice trước!');
    }

    await interaction.reply('⏳ Đang phát nhạc...');

    const stream = await play.stream(url);

    const resource = createAudioResource(stream.stream, {
      inputType: stream.type
    });

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator
    });

    player.play(resource);
    connection.subscribe(player);
  }

  if (interaction.commandName === 'stop') {
    player.stop();
    await interaction.reply('⏹️ Đã dừng nhạc!');
  }
});

client.login(process.env.DISCORD_TOKEN);


