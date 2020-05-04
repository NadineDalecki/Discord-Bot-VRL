const Discord = require('discord.js');
const roleList = require('../info/roles.js')
module.exports = {
  name: 'post',
  execute(message, args) {
    message.delete().catch(_ => { });
    const role = message.guild.roles.find(r => r.name == args.join(" "));
    if (message.member.roles.has(roleList.get("sm"))) { 
   //   role.setMentionable(true).then(async role => {
        message.channel.send(`<@&${role.id}>`)
        message.channel.send(ecc1);
       // await role.setMentionable(false)
    //  }).catch(console.error);
    }
  }
}
const sj5 = new Discord.RichEmbed()
.setColor('#FF0005')  
.setTitle('Space Junkies 3v3 Crossplay Clash on August 3rd!')
.setDescription('Come in and join the Crossplay Clash for crazy 3v3 Team Deathmatches, no matter if you have VR or not!\nEveryone is welcome! Even flatscreen players! 😉\nIf you dont have a partner ask on the Space Junkies Discord in <#548096604679176227>!\n\nPrizes: \n#1: 20.000 Ingame Coins\n#2: 10.000 Ingame Coins\n#3:  5.000 Ingame Coins\n+++1st-3rd place will get a spot in the Hall of Fame\n\nTo participate join the [Space Junkies Discord](https://discordapp.com/invite/spacejunkies) and check out <#548095322958856202>\n\u200B\n')
.setThumbnail('https://cdn.glitch.com/7fa88192-fa6d-4649-be3f-3160c68b23dd%2F764cdacc-5716-4297-9bd5-b7bb588da8f7_spacejunkies-thumb.png?v=1561570567755')
.addField('Need help?', 'Contact <@217458864805773312> or <@102149885091921920> for support\n\u200B\n')
.setImage('https://cdn.discordapp.com/attachments/600595859192676372/605408154842431539/CrossplayClash.PNG?width=871&height=490')
.setTimestamp()
.setFooter('This tournament is not organized by ESL/VRL!');
const ea = new Discord.RichEmbed()
.setColor('#00B0BE')  
.setTitle('VRL Echo Arena')
.setDescription('Weekly cups on Sundays: [Times & Sign Up @ ESL Play](https://play.eslgaming.com/echoarena/global)\n\n[Oculus Store](https://www.oculus.com/experiences/rift/1369078409873402/)\n[More info on vr.eslgaming.com](https://vr.eslgaming.com/echoarena/)')
.setThumbnail('https://cdn.discordapp.com/emojis/535106295100080140.png?v=1')
.addField('Need a team?', 'Visit the official [Echo Games Discord](https://discord.echo.games) and use the **Looking for Team Channels** to find new teammates or participate in Pick-Up Nights and Boot Camps to get ready for VRL!\n\u200B\n')
.addField('Schedule', '\u200B')
.addField('Online Weekly Cups Stage 1:', 'March 24 | March 31 | April 7\nParticipate in all cups to collect ranking-points. ')
.setImage('https://cdn.discordapp.com/attachments/600595859192676372/605408154842431539/CrossplayClash.PNG?width=871&height=490')
.setTimestamp()
.setFooter('This tournament is organized by ESL/VRL');
const ec = new Discord.RichEmbed()
.setColor('#FE1A74')  
.setTitle('VRL Echo Arena')
.setDescription('Weekly cups on Sundays: [Times & Sign Up @ ESL Play](https://play.eslgaming.com/echoarena/global)\n\n[Oculus Store](https://www.oculus.com/experiences/rift/1369078409873402/)\n[More info on vr.eslgaming.com](https://vr.eslgaming.com/echoarena/)')
.setThumbnail('https://cdn.glitch.com/764cdacc-5716-4297-9bd5-b7bb588da8f7%2Fechocombat-thumb.png?1551452317901')
.addField('Need a team?', 'Visit the official [Echo Games Discord](https://discord.echo.games) and use the **Looking for Team Channels** to find new teammates or participate in Pick-Up Nights and Boot Camps to get ready for VRL!\n\u200B\n')
.addField('Schedule', '\u200B')
.addField('Online Weekly Cups Stage 1:', 'March 24 | March 31 | April 7\nParticipate in all cups to collect ranking-points. ')
.setImage('https://cdn.discordapp.com/attachments/600595859192676372/605408154842431539/CrossplayClash.PNG?width=871&height=490')
.setTimestamp()
.setFooter('This tournament is organized by ESL/VRL');
const ecc1 = new Discord.RichEmbed()
.setColor('#DD1A61')
.setTitle('Echo Combat Community Cup on August 10th!')
.setDescription('We will be testing out a custom rule and new format, more info on the cup page!\nEveryone is welcome!😉\n\nTo participate join the [Echo Games Discord](https://discord.gg/DGeBQVx) and check out <#549301881583697930>\n\u200B\n')
.setThumbnail('https://cdn.glitch.com/764cdacc-5716-4297-9bd5-b7bb588da8f7%2Fechocombat-thumb.png?1551452317901')
.addField('Need help?', 'Contact <@509143274087251978> for support\n\u200B\n')
.setTimestamp()
.setFooter('This tournament is not organized by ESL/VRL!');
const ow = new Discord.RichEmbed()
.setColor('#777676')  
.setTitle('VRL Echo Arena')
.setDescription('Weekly cups on Sundays: [Times & Sign Up @ ESL Play](https://play.eslgaming.com/echoarena/global)\n\n[Oculus Store](https://www.oculus.com/experiences/rift/1369078409873402/)\n[More info on vr.eslgaming.com](https://vr.eslgaming.com/echoarena/)')
.setThumbnail('https://cdn.glitch.com/764cdacc-5716-4297-9bd5-b7bb588da8f7%2Fhqdefault.png?1551453374755')
.addField('Need a team?', 'Visit the official [Echo Games Discord](https://discord.echo.games) and use the **Looking for Team Channels** to find new teammates or participate in Pick-Up Nights and Boot Camps to get ready for VRL!\n\u200B\n')
.addField('Schedule', '\u200B')
.addField('Online Weekly Cups Stage 1:', 'March 24 | March 31 | April 7\nParticipate in all cups to collect ranking-points. ')
.setImage('https://cdn.discordapp.com/attachments/600595859192676372/605408154842431539/CrossplayClash.PNG?width=871&height=490')
.setTimestamp()
.setFooter('This tournament is organized by ESL/VRL');
