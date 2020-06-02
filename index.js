/*╔══════════════════════════════════════╗
    Express
  ╚═══════════════════════════════════════╝*/
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
/*╔═══════════════════════════════════════╗
    Bot
  ╚═══════════════════════════════════════╝*/
const Discord = require("discord.js"),
  client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] }),
  fs = require("fs"),
  roleList = require("./info/roles.js"),
  emojiList = require("./info/emoji.json"),
  dialogflow = require("@google-cloud/dialogflow"),
  functions = require("./functions.js"),
  prefix = "!";
/*╔═══════════════════════════════════════╗
    Bot
  ╚═══════════════════════════════════════╝*/
client.once("ready", () => {
  client.user.setActivity("VR League Twitch", {
    url: "https://www.twitch.tv/vrchallenger",
    type: "STREAMING"
  }),
    console.log("Ready!");
});
/*╔═══════════════════════════════════════╗
    ERROR
  ╚═══════════════════════════════════════╝*/
client.on("error", err => {
  client.users.cache.get("338649491894829057").send(err);
});
process.on("uncaughtException", err => {
  client.users.cache.get("338649491894829057").send(err);
});
process.on("unhandledRejection", err => {
  client.users.cache.get("338649491894829057").send(err);
});
/*╔═══════════════════════════════════════╗
    Message
  ╚═══════════════════════════════════════╝*/

client.on("message", async message => {
/*╔═══════════════════════════════════════╗
    Mentions
  ╚═══════════════════════════════════════╝*/
  const news = ["nada", "na_da"];
  if (
    news.includes(message.content.toLowerCase()) &&
    !message.author.bot &&
    !message.content.toLowerCase().includes("canada")
  ) {
    functions.mention(client, message, "338649491894829057");
  } else if (!message.author.bot) {
   
/*╔═══════════════════════════════════════╗
     Dialogflow
  ╚═══════════════════════════════════════╝*/
    if (
      message.channel.type == "dm" &&
      client.user.id != message.author.id &&
      message.content.startsWith(prefix) == false
    ) {
      const answer = await functions.dialogflowQuery(message);
      message.reply(answer.response);
      functions.inform(client, message, answer);
    } else if (!message.content.startsWith(prefix) || message.author.bot)
/*╔══════════════════════════════════════╗
    Commands
  ╚═══════════════════════════════════════╝*/
      return;
    client.commands = new Discord.Collection();
    const commandFiles = fs
      .readdirSync("./commands")
      .filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      client.commands.set(command.name, command);
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
      if (command != "") {
        client.commands.get(command).execute(message, args);
      }
    } catch (error) {
      console.error(error);
    }
  }
});
/*╔═══════════════════════════════════════╗
    Reaction Event
  ╚═══════════════════════════════════════╝*/
client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log("Something went wrong when fetching the message: ", error);
      return;
    }
  }
  const emojiId = reaction.emoji.id.toString();
  if (!user.bot && reaction.message.id === "679385800412233736") {
    if (
      emojiList.hasOwnProperty(emojiId) ||
      emojiList.hasOwnProperty(reaction.emoji.name)
    ) {
      reaction.message.guild.member(user).roles.add(emojiList[emojiId].role)
        .then;
      client.channels.cache
        .get("593500776920252416")
        .send(user.username + " reacted with " + reaction.emoji.name);
    }
  }
});
client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log("Something went wrong when fetching the message: ", error);
      return;
    }
  }
  const emojiId = reaction.emoji.id.toString();
  if (!user.bot && reaction.message.id === "679385800412233736") {
    if (
      emojiList.hasOwnProperty(emojiId) ||
      emojiList.hasOwnProperty(reaction.emoji.name)
    ) {
      reaction.message.guild.member(user).roles.remove(emojiList[emojiId].role)
        .then;
      client.channels.cache
        .get("593500776920252416")
        .send(user.username + " removed " + reaction.emoji.name);
    }
  }
});
/*╔═══════════════════════════════════════╗
    Logs
  ╚═══════════════════════════════════════╝*/
client.on("guildMemberAdd", member => {
  client.channels.cache
    .get("566294428453699584")
    .send(`${member} joined\nMember count: ${member.guild.memberCount}`);
});
client.on("guildMemberRemove", member => {
  client.channels.cache
    .get("566294428453699584")
    .send(
      `${member.user.username} left\nMember count: ${member.guild.memberCount}`
    );
});
client.on("guildBanAdd", function(guild, user, member) {
  client.channels.cache
    .get("566294428453699584")
    .send(
      `${member.user.username} was banned\nMember count: ${member.guild.memberCount}`
    );
});
/*╔═══════════════════════════════════════╗
    Deleted Messages
  ╚═══════════════════════════════════════╝*/
client.on("messageDelete", async message => {
  const entry = await message.guild
    .fetchAuditLogs({ type: "MESSAGE_DELETE" })
    .then(audit => audit.entries.first());
  let user = "";
  if (
    entry.extra.channel.id === message.channel.id &&
    entry.target.id === message.author.id &&
    entry.createdTimestamp > Date.now() - 5000 &&
    entry.extra.count >= 1
  ) {
    user = entry.executor.username;
  } else {
    user = message.author.username;
  }
  const delmsg = {
    embed: {
      color: 1,
      description: `${message.content}`,
      timestamp: "",
      author: {
        name: `${user} deleted a message from ${message.author.username} in #${message.channel.name}`
      }
    }
  };
  try {
    client.channels.cache.get("593500776920252416").send(delmsg);
  } catch (error) {
    client.channels.cache
      .get("593500776920252416")
      .send("Deleted Messages send: " + error);
  }
});
client.login(process.env.BOT);
