import { createServer } from 'http';

import { Client, Intents, Message, TextChannel } from 'discord.js';
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Discord Bot is active now\n');
}).listen(3000);

client.on('ready', message =>{
  console.log('Bot is ready.');
});

client.on('message', message =>{
  if (message.author.id == client.user.id || message.author.bot){
    return;
  }
  if(message.mentions.has(client.user)){
    sendReply(message, "呼びましたか？");
    return;
  }
  if (message.content.match(/にゃ～ん|にゃーん/)){
    let text = "にゃ～ん";
    sendMsg(message.channel.id, text);
    return;
  }
});

if(process.env.DISCORD_BOT_TOKEN == undefined){
 console.log('DISCORD_BOT_TOKENが設定されていません。');
 process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );

function sendReply(message: Message<boolean>, text: string){
  message.reply(text)
    .then( text => console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId: string, text: string, option={}){
  const textChannel =  client.channels.cache.get(channelId) as TextChannel;
  textChannel.send(text)
    .then( text => console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}
