require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');

const client = new Client({
 intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.MessageContent
 ]
});

const player = new Player(client);

client.once('ready', () => {
 console.log('Bot nhạc online!');
});

client.on('messageCreate', async (message) => {

 if(message.author.bot) return;

 // Test bot
 if(message.content === '!ping'){
   message.reply('Pong!');
 }

 // Phát nhạc
 if(message.content.startsWith('!play')){

   let song = message.content.replace('!play ','');
   
   if(!message.member.voice.channel){
      return message.reply(
      'Bạn phải vào voice trước!'
      );
   }

   await player.play(
      message.member.voice.channel,
      song,
      {
        nodeOptions:{
          metadata: message.channel
        }
      }
   );

   message.reply('Đang phát: ' + song);
 }

 // Bỏ qua bài
 if(message.content === '!skip'){
   let queue = player.nodes.get(message.guild);
   if(queue) queue.node.skip();
 }

 // Dừng nhạc
 if(message.content === '!stop'){
   let queue = player.nodes.get(message.guild);
   if(queue) queue.delete();
 }

});

client.login(process.env.TOKEN);
