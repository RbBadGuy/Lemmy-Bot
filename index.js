//----Dont-Change-Unless-Know-To----\\
const Discord = require('discord.js');

const bot = new Discord.Client();

const Levels = require('discord-xp')

Levels.setURL("mongodb+srv://RbBadGuy:1374123412viS@testsubject.e0lmh.mongodb.net/Data")

const superagent = require("superagent")

const mongoose = require('mongoose')

const { readdirSync, read } = require('fs');

const { join } = require('path');
const { connect } = require('http2');

bot.commands = new Discord.Collection();
//---End-Line---\\
const prefix = '-';
//this prefix can be what ever you want\\

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    bot.commands.set(command.name, command);
}

bot.on("error", console.error);


//-----------------------Log-Edit------------------------------------------
bot.on('ready', () => {
    console.log('Lemmyy is ready!');
    bot.user.setActivity('For Help Prefix is: -', { type: "WATCHING" }).catch(console.error)
})
//-----Bot-Main-Login-----\\

bot.login(process.env.token);
//----------------------Welcome_Embeded--------------------------------------------
bot.on('guildMemberAdd', async member => {
    let channel = bot.channels.cache.get("897391132982521867")
    if (!channel) return;

    let embed = new Discord.MessageEmbed()
    .setTitle(`𝑯𝒆𝒚 ${member.user.tag} 𝒘𝒆𝒍𝒄𝒐𝒎𝒆 𝒕𝒐『⚔』 𝓕𝓻𝓮𝓮𝓭𝓸𝓶 𝓕𝓲𝓰𝓱𝓽𝓮𝓻𝓼! 😀`)
    .setDescription(`𝑻𝒉𝒂𝒏𝒌𝒔 𝑭𝒐𝒓 𝑱𝒐𝒊𝒏𝒊𝒏𝒈 𝑹𝒃𝑩𝒂𝒅𝑮𝒖𝒚 𝑺𝒆𝒓𝒗𝒆𝒓 𝑷𝒍𝒆𝒂𝒔𝒆 𝑺𝒖𝒃𝒔𝒄𝒓𝒊𝒃𝒆 𝑴𝒆𝒔𝒔𝒆𝒈𝒆 𝑻𝒐 𝑶𝒘𝒏𝒆𝒓 𝑻𝒐 𝑮𝒆𝒕 𝑺𝒑𝒆𝒄𝒊𝒂𝒍 𝑹𝒐𝒍𝒆`)
    .setImage("https://cdn.discordapp.com/attachments/897391803458797579/902890738377961522/welcome-poster-spectrum-brush-strokes-260nw-1146069941.png")
    channel.send(embed)
})

//----------------------Commands-DangerZone----------------------------------------

bot.on("message", async message => {

    if(message.author.bot) return;   
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commands = args.shift().toLowerCase();

        if(!bot.commands.has(commands)) return;


        try {
            bot.commands.get(commands).run(bot, message, args);
        } catch (error){
            console.error(error);
        }
    }
})

bot.on("message", async message => {
if (message.author.bot) return;
if (!message.content.toLocaleLowerCase().startsWith(prefix)) return;

let args = message.content.slice(prefix.length).trim().split(/ +/g);
let cmd = args.shift().toLowerCase();

if (cmd === "google") {
    let query = args.join(" ");
    if (!query) return message.channel.send("No Query Type -Google how to make etc`");

    let result = await superagent.get("https://customsearch.googleapis.com/customsearch/v1")
    .query({q: query, cx: "1502a645fe7615842", key: "AIzaSyDF1culqbxpXYp-9kSFom_czFjdqhFHDbo"});

    if (!result.body.items) return message.channel.send("Not found...");
    if (result.status >= 400) return (await message.channel.send("Error...")).attachments(console.log(result.message));

    let res = result.body.items[0];
    const embed = new Discord.MessageEmbed()
    .setColor()
    .setTitle(res.title)
    .setDescription(res.snippet)
    .setURL(res.link)
    .setImage(res.pagemap.cse_image[0].src || res.pagemap.cse_thumbnil[0].src)
    return message.channel.send(embed);
 }
});

bot.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  if(!message.content.endsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === 'noice'){
    message.channel.send('die loser');
  } else if (command == 'rb'){
      message.channel.send('https://www.youtube.com/c/RbBadGuy');
  } else if (command == 'fire'){
      message.channel.send(' oh no you house is in fire what do we do ||https://tenor.com/view/pir%C3%B3mano-meme-jeje-odio-bomberos-gif-15722930  i https://tenor.com/view/travel-fountain-mansion-gif-7238280 || i got u new house yeeeee')
  } else if (command == 'meme'){
     message.channel.send('i am not an meme i am lemmy')
  } else if (command == 'lemmy'){
     message.channel.send('i am not lemmy i am meme')
  } else if (command == 'ticket'){
    bot.commands.get('ticket').execute(bot, message, args);
  }
});

bot.on("message", async message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const randomXp = Math.floor(Math.random() * 9) + 1; //Random amont of XP until the number you want + 1
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You leveled up to ${user.level}! Keep it going!`);
    }
    
    //Rank
    if(command === "rank") {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You are currently level **${user.level}**!`)
    }
    
    //Leaderboard
    if(command === "leaderboard" || command === "lb") {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = Levels.computeLeaderboard(bot, rawLeaderboard); 

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

        message.channel.send(`${lb.join("\n\n")}}`)
    }
})