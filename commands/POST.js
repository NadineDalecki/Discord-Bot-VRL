const Discord = require('discord.js');
const roleList = require('../info/roles.js')
module.exports = {
  name: 'post',
  execute(message, args) {
    message.delete().catch(_ => { });
    const role = message.guild.roles.find(r => r.name == args.join(" "));
    if (message.member.roles.has(roleList.get("sm"))) { 
   //   role.setMentionable(true).then(async role => {
        //message.channel.send(`<@&${role.id}>`)
       // await role.setMentionable(false)
    //  }).catch(console.error);
    }
  }
}
