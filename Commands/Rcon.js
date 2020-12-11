const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    //Code Start
    let conObj = args.shift().toLowerCase();
    if(args[0].includes(':')){
        let index = bot.servers.findIndex(s => `${s.ip}:${s.port}` == conObj);
        if(index == -1)
            return message.channel.send('No registered IP found.')
        conObj = bot.servers[index];
    }else{
        let index = bot.servers.findIndex(s => s.name == conObj);
        if(index == -1)
            return message.channel.send('No registered IP found.')
        conObj = bot.servers[index];
    }

    const client = new bot.rconClient.default(conObj.ip, parseInt(conObj.port), conObj.password);
    let command = args.join(' ');
    let msg = await message.channel.send(bot.embed('Sending command, please wait.'));

    client.connect().then(() => {
        return client.send(command)
    }).then(res => {
        msg.edit(bot.embed(res.split('\n').slice(0, -1).join('\n') || 'Success - Empty'))
        return client.disconnect();
    }).then(() => undefined).catch(error => {
        msg.edit(bot.embed(error))
        console.error(error);
    });
	//Code End

}
module.exports.config = {
    roles: ["671475124372766725", "362807237791449088","786871934549360651"],
    cmdPerms: ["EMBED_LINKS"],
    usage: "[server name | ip:port] [command sequence]", //if args is set to false you can remove this otherwise describe how to use the command
    command: "rcon",
    cooldown: 5, //Cooldown in seconds
	args: true //If the command requires input aka if you need to write just the command name or command name with some more arguments/fields
}