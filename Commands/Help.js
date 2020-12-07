const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {

    //Code Start
    let msg = await message.channel.send(bot.embed('Fetching data, please wait.'))

    let conObj = args.shift().toLowerCase();
    if(conObj.includes(':')){
        let index = bot.servers.findIndex(s => `${s.ip}:${s.port}` == conObj);
        if(index == -1)
            return msg.edit(bot.embed('No registered IP found.'))
        conObj = bot.servers[index];
    }else{
        let index = bot.servers.findIndex(s => s.name == conObj);
        if(index == -1)
            return msg.edit(bot.embed('No registered IP found.'))
        conObj = bot.servers[index];
    }

    const client = new bot.rconClient.default(conObj.ip, parseInt(conObj.port), conObj.password);

    client.connect().then(() => {
        return client.send('help')
    }).then(res => {
        const embed = new Discord.MessageEmbed()
            .setTitle('Available commands')
            .setDescription(res.split('\n').map(cmd => {
                let cmdArgs = cmd.split(/ +/)
                if(cmd.includes('Reason')){
                    let idx = cmdArgs.findIndex(arg => arg.includes('Reason'))
                    cmdArgs.push(cmdArgs.splice(idx, 1))
                }
                return `\`server\` **${cmdArgs.shift()}** ${cmdArgs.join(' ').replace(/\|/g, ' | ')}`
            }).slice(0, -1).join('\n'))
            .setColor('RANDOM')
        msg.edit(embed);
        return client.disconnect();
    }).then(() => undefined).catch(error => {
        msg.edit(bot.embed(error))
        console.error(error);
    });
	//Code End

}

module.exports.config = {
    cmdPerms: ["EMBED_LINKS"],
    usage: "[server name]", //if args is set to false you can remove this otherwise describe how to use the command
    command: "help",
    cooldown: 5, //Cooldown in seconds
	args: true //If the command requires input aka if you need to write just the command name or command name with some more arguments/fields
}