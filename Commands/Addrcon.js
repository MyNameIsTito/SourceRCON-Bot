const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {

    //Code Start
    message.delete();
    if(args.length != 3)
        return message.channel.send('Invalid usage. The correct usage is: register [ip:port] [password] [server name]');

    let ip = args[0].split(':')[0];
    let port = args[0].split(':')[1];
    let password = args[1];
    let servername = args[2].toLowerCase();



    let index = bot.servers.findIndex(s => `${s.ip}:${s.port}` == ip)
    if(index != -1)
        return message.channel.send(`This ip is already registered under \`${bot.servers[index].name}\` name`)

    bot.servers.push({ip: ip, port: port, password: password, name: servername})
    message.channel.send('IP was saved')
    fs.writeFileSync('./Storage/Servers.json', JSON.stringify(bot.servers, null, 4));
	//Code End

}

module.exports.config = {
    roles: ["671475124372766725", "362807237791449088","786871934549360651"],
    cmdPerms: ["EMBED_LINKS"],
    usage: "[ip:port] [password] [server name]", //if args is set to false you can remove this otherwise describe how to use the command
    command: "addrcon",
    cooldown: 5, //Cooldown in seconds
	args: true //If the command requires input aka if you need to write just the command name or command name with some more arguments/fields
}