const Discord = require('discord.js');
const client = new Discord.Client({autoReconnect:true});

const request = require('request');

var config = {
    prefix: "!",
    lock_chat_to_crewlinkhelp: true,
    version: "v1.2",
    token: ""
}

var servers = [

    {region: "North America", url: "https://crewlink.among-us.tech", author: "Cobchise", uptimeid: "", playercount: "Loading Player Count"},
    {region: "North America", url: "https://crewlink.glitch.me", author: "Lermatroid", uptimeid: "", playercount: "Loading Player Count"},
    {region: "North America", url: "http://54.193.94.35:9736", author: "Ottomated", uptimeid: "", playercount: "Loading Player Count"},
    {region: "Oceania", url: "http://s1.theskeld.xyz", author: "Tito", uptimeid: "", playercount: "Loading Player Count"},
    {region: "North America", url: "http://s2.theskeld.xyz", author: "Tito", uptimeid: "", playercount: "Loading Player Count"},
    {region: "North America", url: "http://s3.theskeld.xyz", author: "Tito", uptimeid: "", playercount: "Loading Player Count"},
    {region: "Europe", url: "http://s4.theskeld.xyz", author: "Tito", uptimeid: "", playercount: "Loading Player Count"},
    {region: "North America", url: "http://45.32.220.8:9736", author: "Ubergeek77", uptimeid: "", playercount: "Loading Player Count"}

]

//{url: "[North America] http://45.32.220.8:9736", author: "{u}bergeek77", uptimeid: "", playercount: "Loading Player Count"}

client.on('ready', () => {

    console.log(`CrewLink Bot is online in ` + client.guilds.cache.size + " Servers");
    client.user.setActivity(config.prefix + "Help | Helping People With CrewLink", { type: 'WATCHING' });
    
});

client.on("message", function(msg){

    if (msg.author.bot) return;
    if (msg.channel.type == "dm") return;
    //console.log(JSON.stringify(msg.member.roles.cache));

    if (msg.content.toLowerCase().includes("crewlink") && msg.channel.name !== 'crewlink-help' && msg.channel.name !== 'gaming' && config.lock_chat_to_crewlinkhelp && !userHasRoles(msg.member.roles.cache)){

        msg.author.send("```Sorry, your message was deleted becuase it was posted in a non-CrewLink related channel. \n\nPlease send it to #crewlink-help or #gaming instead.```")
        msg.delete();

    }

    if (msg.content.toLowerCase().split(" ")[0] === config.prefix + "servers"){

        //console.log(msg.content);

        if(msg.channel.name !== 'crewlink-help' && !userHasRoles(msg.member.roles.cache)){ msg.author.send("```Sorry, CrewLink Bot commands can only be ran in the #crewlink-help channel. Please re-send your command there.```"); msg.delete(); return;}

        const serversEmbed = new Discord.MessageEmbed()
	    .setColor('#853ddc')
	    .setTitle('Crewlink Alternate Servers:')
        .setAuthor('CrewLink Help', 'https://github.com/ottomated/CrewLink/raw/master/logo.png', 'https://github.com/ottomated/CrewLink')
        .setDescription("Due to the popularity of CrewLink, the main server is often down or overloaded. It is recommended you use one of the following servers instead by setting it as the voice server in CrewLink Settings. **Note:** Make sure you copy the URL exactly!")
        .addField('\u200b', '**Servers** (Player counts are updated every 30 sec)')
        .setURL("https://crewlinkstatus.xyz/");
        

        servers.forEach(function(i, index){

            serversEmbed.addField(`${i.author}'s Server | ${i.playercount} | ${i.region}` , "`" + i.url + "`" , false);

        });

        serversEmbed.setTimestamp()
        .addField('\u200b', '**One final note:** please remeber that the people you are playing with **must** be using the same voice server as you in order for you to be able to hear each other.')
        .setFooter('CrewLink Bot ' + config.version, 'https://github.com/ottomated/CrewLink/raw/master/logo.png');


        msg.channel.send(serversEmbed);

    }

    if (msg.content.toLowerCase().split(" ")[0] === config.prefix + "faq"){

        //console.log(msg.content);
        if(msg.channel.name !== 'crewlink-help' && !userHasRoles(msg.member.roles.cache)){ msg.author.send("```Sorry, CrewLink Bot commands can only be ran in the #crewlink-help channel. Please re-send your command there.```"); msg.delete(); return;}

        const faqEmbed = new Discord.MessageEmbed()
	    .setColor('#853ddc')
	    .setTitle('Crewlink FAQ')
        .setAuthor('CrewLink Help', 'https://github.com/ottomated/CrewLink/raw/master/logo.png', 'https://github.com/ottomated/CrewLink')
        .setURL("https://github.com/ottomated/CrewLink")
        .addField("What is CrewLink?", "CrewLink is a project which implements proximity voice chat in Among Us. Everyone in an Among Us lobby with this program running will be able to communicate over voice in-game, with no third-party programs required. Spatial audio ensures that you can only hear people close to you.", false)
        .addField("What platforms does CrewLink support?", "CrewLink officaly only supports Windows 64bit devices at this moment. Crewlink does not work on the mobile version of Among Us.", false)
        .addField("I am getting an error about offsets, what should I do?", "CrewLink's main server is often overloaded due to the high volume of users, this causes the offsets error message. It is reccomened that you use a alternative public server instead. You can find more information about these servers by using the `" + config.prefix +"servers` command.", false)
        .addField("Where do I install CrewLink from?", "CrewLink's **only** download page is the one on its Github release page: https://github.com/ottomated/CrewLink/releases. **Do not download CrewLink from any other source.**", false)
        .setTimestamp()
        .setFooter('CrewLink Bot ' + config.version, 'https://github.com/ottomated/CrewLink/raw/master/logo.png');


        msg.channel.send(faqEmbed);

    }


    if (msg.content.toLowerCase().split(" ")[0] === config.prefix + "tutorial"){

        if(msg.channel.name !== 'crewlink-help' && !userHasRoles(msg.member.roles.cache)){ msg.author.send("```Sorry, CrewLink Bot commands can only be ran in the #crewlink-help channel. Please re-send your command there.```"); msg.delete(); return;}
        msg.channel.send("Follow this tutorial for instructions on how to download CrewLink: https://www.youtube.com/watch?v=_8F4f5iQEIc")

    }

    if (msg.content.toLowerCase().split(" ")[0] === config.prefix + "help"){

        if(msg.channel.name !== 'crewlink-help' && !userHasRoles(msg.member.roles.cache)){ msg.author.send("```Sorry, CrewLink Bot commands can only be ran in the #crewlink-help channel. Please re-send your command there.```"); msg.delete(); return;}

        var helpEmbed = new Discord.MessageEmbed()
        .setColor('#853ddc')
        .setTitle("Hey There!")
        .setDescription("Here are the commands CrewLink Bot supports:")
        .setAuthor('CrewLink Help', 'https://github.com/ottomated/CrewLink/raw/master/logo.png', 'https://github.com/ottomated/CrewLink')
        .setThumbnail("https://github.com/ottomated/CrewLink/raw/master/logo.png")
        .addField(config.prefix + "Help", "The command you are using right now! This command returns a list of comands CrewLink Bot supports.")
        .addField(config.prefix + "Servers", "Get a list of public alternate servers you can use.")
        .addField(config.prefix + "Tutorial", "Get information on how to install CrewLink.")
        .addField(config.prefix + "Faq", "Get the answers to common questions and issues with CrewLink.")
        .setTimestamp()
        .setFooter('CrewLink Bot ' + config.version, 'https://github.com/ottomated/CrewLink/raw/master/logo.png');
        msg.channel.send(helpEmbed);
        
    }

});

client.login(config.token);

function userHasRoles(m){

    var hasRoles = false;

    m.forEach(function(i, index){

        if(i.name != "@everyone"){
            hasRoles = true;
        }

    });

    return hasRoles;

}

async function updatePlayerCount(){
    servers.forEach(function(i, index){

        request(i.url, function(err, res, body){
            
            if(err == null){

                if(!body.includes("Cannot GET /")){
                    servers[index].playercount = body.substring(body.indexOf("are currently ") + 14).split(" ")[0] + ' Players';
                } else {
                    servers[index].playercount = "Offline";
                }       

            } else {
                servers[index].playercount = "Offline";
                console.log(err);
            }

        })

    });
}

updatePlayerCount();

setInterval(updatePlayerCount, 30000);