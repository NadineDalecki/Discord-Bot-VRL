/*╔═══════════════════════════════════════╗
    ALL BOTS
  ╚═══════════════════════════════════════╝*/
    const Discord = require("discord.js")
    const Prefix = "!"
    const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]})
    const functions = require("./functions.js")
    const df = require("./dialogflow-functions.js")

    process.on("error", error => functions.Error(client, error));
    process.on("uncaughtException", error => functions.Error(client, error));
    process.on("unhandledRejection", error => functions.Error(client, error));

client.once("ready", () => {
  client.user.setActivity("VR League Twitch", {
    url: "https://www.twitch.tv/vrchallenger",
    type: "STREAMING"
  }),
    console.log("Ready!");
});
    client.on("error", error => functions.Error(client, error))
    client.on("messageDelete", async message => {functions.DeletedMessage(client, message)})
    client.on("messageReactionAdd", async (reaction, user) => {functions.RoleAdd(reaction, user, "679385800412233736")})
    client.on("messageReactionRemove", async (reaction, user) => {functions.RoleRemove(reaction, user, "679385800412233736")})
    client.on("guildMemberAdd", member => {client.channels.cache.get(process.env.LOG).send(`${member} joined\nMember count: ${member.guild.memberCount}`)})
    client.on("guildMemberRemove", member => {client.channels.cache.get(process.env.LOG).send(`${member.user.username} left\nMember count: ${member.guild.memberCount}`)})
    client.on("guildBanAdd", function(guild, user, member) {client.channels.cache.get(process.env.LOG).send(`${member.user.username} banned\nMember count: ${member.guild.memberCount}`)})
    client.login(process.env.BOT)

    const express = require("express");
    const app = express();
    app.get("/", (request, response) => {
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);

/*╔═══════════════════════════════════════╗
    Message
  ╚═══════════════════════════════════════╝*/
  
client.on("message", async message => {
    if  (!message.author.bot) {
    /*┌───────────────────────────┐
        Mentions
      └───────────────────────────┘ */
      const News = ["nada", "na_da"]
        if (News.includes(message.content.toLowerCase()) && !message.author.bot && !message.content.toLowerCase().includes("canada")) {
                functions.Mention(client, message, process.env.OWNER)
        } 
    /*╔═══════════════════════════════════════╗
        Dialogflow
      ╚═══════════════════════════════════════╝*/
    /*┌───────────────────────────┐
        DM
      └───────────────────────────┘ */ 
        else if (message.channel.type == "dm" && client.user.id != message.author.id && !message.content.startsWith(Prefix)) {
			const df = require("./dialogflow-functions.js")
			const answer = await functions.DialogflowQuery(message, message.cleanContent)
			df.Function(client, answer, message)
        }
      /*╔═══════════════════════════════════════╗
          Commands
        ╚═══════════════════════════════════════╝*/
        else if (!message.content.startsWith(Prefix) || message.author.bot) return;
        functions.Command(client, message, Prefix);
    }});

