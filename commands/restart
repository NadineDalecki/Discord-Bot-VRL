const Discord = require('discord.js');
const thumbnail = 'https://cdn.discordapp.com/emojis/535106295100080140.png?v=1';

const restart = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setAuthor('Echo Arena Restart Rule')
	.setThumbnail('https://cdn.discordapp.com/emojis/535106295100080140.png?v=1')
	.addField('Responsibility', 'Teams are responsible for any of their own technical issues, including hardware, software, or internet issues. Matches are to be continued as normal if these issues arise.', true)
	.addField('Procedure', "If any problems occur, the player has to notify a referee immediately. If a referee is not notified in time we can not guarantee that the problem will be fixed in time for the match start\n\nIf issues arise the players must continue to play until the next goal is scored. Each team can request to pause the game once per round by pressing the restart button after a goal. If the restart button is not pressed before the countdown has finished and the teams have launched then the game will continue to the next conceded goal.\nThe match will be continued following these steps:\n\n:one: Set the time to what the timer shows after the last goal.\n:two: Set the disc position to the team that was last scored on.\n:three: Start the match and continue normally\n\nIf the third player is able to rejoin the match he can do so at any time.", true)
	.addField('Forfeiting', 'A team can forfeit at any time.', true)
  .addField('Default win', 'A team is not allowed to start the cup with only 2 players. In that case the other team receive a default win.\n\n[Full rule in the rule book: 7.3.1.4 Technical Issues](https://gfx.esl.eu/gfx/media/play/vrleague/VRLS3.pdf)', true)

module.exports = {
  name: 'restart',
  execute(message) {
     message.channel.send(restart)
  },
}
