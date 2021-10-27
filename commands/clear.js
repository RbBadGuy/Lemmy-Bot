module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Clears the chat",
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('U Have No Permission To Use This Command!');
        
        let deleteAmount;
    
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply('Please put a number only!') }
    
        if (parseInt(args[0]) > 100) {
            return message.reply('You can only delete 100 messages at a time!')
        } else {
            deleteAmount = parseInt(args[0]);
        }
    
        message.channel.bulkDelete(deleteAmount + 1, true);
        await message.channel.send(`**Successfully** Deleted ***${deleteAmount}*** Messages.`).then(m => m.delete({timeout: 5000}))
    }
}

