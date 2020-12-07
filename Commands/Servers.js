const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    //Code Start
    message.channel.send(bot.embed(bot.servers.map(s => s.name).join('\n') || 'No servers added'))
	//Code End

}

module.exports.config = {
    cmdPerms: ["EMBED_LINKS"],
    command: "servers",
    cooldown: 5, //Cooldown in seconds
	args: false //If the command requires input aka if you need to write just the command name or command name with some more arguments/fields
}