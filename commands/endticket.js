
const Discord = require('discord.js')


module.exports = {
    name: 'closeticket',
    description: "close the ticket",
    run(bot, message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Only a moderator can end a ticket!")

        if(message.member.hasPermission("ADMINISTRATOR")) message.channnel.delete()
    }

}