const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    const target = message. author;
    const user = await Levels.fetch(target.id, message.guild.id);
    const neededXp =
    Levels.xpFor(parseInt(user.level) + 1);
    if (!user) return message.reply("You dont have xp. try to send some messages.");
    const rank = new canvacord. Rank()
    .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png' }))
    .setCurrentXP(user.xp)
    .setRequiredxP(neededXp)
    .setStatus(message.member.presence.status)
    .setProgressBar('#FFA500', "COLOR")
    .setUsername (message. author.username)
    .setDiscriminator('0001')
    rank.build()
    .then(data => {
    const attatchment = new Discord.MessageAttachment(data, 'png')
    message. channel.send(attatchment);
    })

    module.exports.config = {
        name: "rank",
        aliases: ['level']
    }   