const roleList = require('../info/roles.js');
const Discord = require('discord.js');
module.exports = {
  name: 'edit',
  execute(message, args) {
    message.delete().catch(_ => { });
    if (message.member.roles.has(roleList.get("sm"))) {     
      message.channel.fetchMessage(args.shift())
        .then(msg => msg.edit(embed))
        .catch(console.error)
    }
  }
}

const embed = new Discord.RichEmbed()
.setColor('#DD1A61')
.setTitle('Echo Combat Community Cup on August 10th!')
.setDescription('We will be testing out a custom rule and new format, more info on the cup page!\nEveryone is welcome! 😉\n\nTo participate join the [Echo Games Discord](https://discord.gg/DGeBQVx) and check out <#549301881583697930>\n\u200B\n')
.setThumbnail('https://cdn.glitch.com/764cdacc-5716-4297-9bd5-b7bb588da8f7%2Fechocombat-thumb.png?1551452317901')
.addField('Need help?', 'Contact <@509143274087251978> for support\n\u200B\n')
.setTimestamp()
.setFooter('This tournament is not organized by ESL/VRL!');
