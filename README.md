# SourceRCON-Bot
Discord Bot for connecting/controlling gameservers that use the SourceRCON protocol.

This bot was designed to use for Mordhau servers, but will work with any Source RCON protocol gameservers. I have tested it with CSGO servers also.

Basic Summary of the bot is that you can use the !addrcon command to add the login info of your servers and set a name for each server (which is used when sending commands to a specific server). I did it this way so that nobody needs to know the IP:Port to send a command, just need to know the server name and have a role that has permission to use the bot. This grants full access so I recommend only allowing people/roles that are fully trusted, the new features in the latest patch allow for advanced server access and editing from the rcon connection.

Commands:

!servers - Lists off all available server names that have been added (Does not display any passwords or IP info)
!addrcon [ip:port] [password] [server name] - Used to add servers, I locked this command to only the owners of my server (the info for this entire command is deleted almost instantly after being sent in a channel, I still highly recommend you do this in a very private channel in case someone catches a glimpse.)
!rcon [server name | ip:port] [command sequence] - this is the basic command to send all commands to your servers, you can use server name or the IP:Port anything after the server name will be taken as a command to the server. An example would be "!rcon duels1 ban <playfabID> duration reason", it will execute the command and give a response back of whatever the server responds with.
!help - Currently bugged, but you can get the same response by doing !rcon [server_name] help and it will list all available commands for rcon.




Setup:
-Windows-
Typical setup for any node.js bot, install node.js ( you don't need the extra stuff it asks about ) 
Once installed go to the folder that your bot is in and make sure you have added your bot token, set the prefix you want to use, you can also edit the activity of what the bot status says.
Pretty much every server owner is going to want to change or edit the permissions of who and what roles can use the bot. You can do this by going into the "Commands" folder and editing any of the command.js files that you want role locked. You will need to change the info in the following area:

module.exports.config = {
    roles: ["709999889362321507", "709999889375035443"],

I recommend locking at minimum the rcon.js and the addrcon.js, the help.js and servers.js cannot really be used in a negative way other than to spam the commands.
There is a section like this for all the commands and also you are able to add more commands to this bot if you need. I'd love to see what other stuff you guys can come up with and add to the features of the bot. (There is even a template.js file on the main directory that shows you all the variables and things that can be set for a command file.)

After that is done go back to the main folder and SHIFT + Right Click inside the file explorer and on the dropdown click Open Windows Powershell here. You need to install discord.js by running the "npm install discord.js" command. Thats it and after its done you should be able to start the bot using "node" or "node index.js" in the powershell window.

I have only done the guide for Windows so far, its pretty simple with node how to get a bot working so it shouldn't be much different for linux.
