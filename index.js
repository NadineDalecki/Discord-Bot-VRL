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
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const roleList = require("./info/roles.js");
const dialogflow = require("dialogflow");
const prefix = "!";
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
  console.log(err);
});
process.on("uncaughtException", err => {
  console.log(err);
});
process.on("unhandledRejection", err => {
  console.log(err);
});
/*╔═══════════════════════════════════════╗
    Message
  ╚═══════════════════════════════════════╝*/
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
client.on("message", async message => {
/*╔═══════════════════════════════════════╗
    Mentions
  ╚═══════════════════════════════════════╝*/
  if (
    (message.content.toLowerCase().includes("na_da") ||
      message.content.toLowerCase().includes("nada")) &&
    !message.author.bot &&
    !message.content.toLowerCase().includes("canada")
  ) {
    client.users
      .get("338649491894829057")
      .send(
        "You were mentioned by " +
          message.author.username +
          " in " +
          message.channel.name +
          " : " +
          message.content +
          "\n" +
          message.url
      );
  }
/*╔═══════════════════════════════════════╗
     Repost
  ╚═══════════════════════════════════════╝*/
  const cont = message.content;
  let embed = { embed: { description: cont } };
  let url = null;
  if (message.author.bot) {
    if (message.attachments.size > 0) {
      message.attachments.map(attachment => {
        url = attachment.url;
      });
      if (url != null) {
        embed = { embed: { image: { url: url } } };
      }
      if (cont.length >= 2 || (url != null && cont.length < 1)) {
        if (message.channel.id === "563835518219976730") {
          //EA
          client.channels.get("564501656323096586").send(embed);
        } else if (message.channel.id === "563835476520337411") {
          //OW
          client.channels.get("564502301952311296").send(embed);
        } else if (message.channel.id === "563835561597730837") {
          //EC
          client.channels.get("564511050636984341").send(embed);
        } else if (message.channel.id === "579224999173292042") {
          //Stream
          client.channels.get("593500776920252416").send(embed);
        }
      }
    } else {
      if (message.channel.id === "563835518219976730") {
        //EA
        client.channels.get("564501656323096586").send(embed);
      } else if (message.channel.id === "563835476520337411") {
        //OW
        client.channels.get("564502301952311296").send(embed);
      } else if (message.channel.id === "563835561597730837") {
        //EC
        client.channels.get("564511050636984341").send(embed);
      } else if (message.channel.id === "579224999173292042") {
        //Stream
        client.channels.get("593500776920252416").send(embed);
      }
    }
  } else if (!message.author.bot) {
/*╔═══════════════════════════════════════╗
     Commands
  ╚═══════════════════════════════════════╝*/
/*╔═══════════════════════════════════════╗
     Dialogflow
  ╚═══════════════════════════════════════╝*/
    if (
      message.channel.type == "dm" &&
      client.user.id != message.author.id &&
      message.content.startsWith(prefix) == false
    ) {
      const userRandom = Math.floor(Math.random() * 1000 + 1);
      function remove(username, text) {
        return text.replace("@" + username + " ", "");
      }
      const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
      const clientEmail = process.env.CLIENT_EMAIL;
      const config = {
        credentials: {
          private_key: privateKey,
          client_email: clientEmail
        }
      };
      const sessionClient = new dialogflow.SessionsClient(config);
      const sessionPath = sessionClient.sessionPath(
        process.env.PROJECT_ID,
        toString(userRandom)
      );
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: "en-US"
          }
        }
      };
      //const intent = response[0].queryResult.intent.displayName (usful if you wanna check if the intent is recognised correctly without checking dialogflow)
      const response = await sessionClient.detectIntent(request);
      const rep = response[0].queryResult.fulfillmentText;
      if (response[0].queryResult.intent == null) {
        //sometimes the intent is null, if I remember correctly that happens for the fallback answers but I didn't work on this in a while and I forgot :D
        console.log(response[0].queryResult.intent);
        //DEFAULT ANSWER
        message.reply(rep);
      } else {
        message.reply(rep);
        client.users
          .get("338649491894829057")
          .send(`**${message.author.username}:** ${message}`); //just for me for testing
        client.users.get("338649491894829057").send("**VRL:** " + rep); ////just for me for testing
      }
    }
/*╔══════════════════════════════════════╗
    Commands
  ╚═══════════════════════════════════════╝*/
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const argsmess = message.content;
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
      if (command != "") {
        client.commands.get(command).execute(message, args, client);
      }
    } catch (error) {
      console.error(error);
      client.channels
        .get("593500776920252416")
        .send("Command handler: " + error);
    }
  }
});
/*╔═══════════════════════════════════════╗
    Reaction Event
  ╚═══════════════════════════════════════╝*/
const events = {
  MESSAGE_REACTION_ADD: "messageReactionAdd",
  MESSAGE_REACTION_REMOVE: "messageReactionRemove"
};
client.on("raw", async event => {
  if (!events.hasOwnProperty(event.t)) return;
  const user = client.users.get(event.d.user_id);
  const channel = client.channels.get(event.d.channel_id);
  if (channel.messages.has(event.d.message_id)) return;
  const message = await channel.fetchMessage(event.d.message_id);
  const emojiKey = event.d.emoji.id
    ? `${event.d.emoji.name}:${event.d.emoji.id}`
    : event.d.emoji.name;
  let reaction = message.reactions.get(emojiKey);
  if (!reaction) {
    const emoji = new Discord.Emoji(
      client.guilds.get(event.d.guild_id),
      event.d.emoji
    );
    reaction = new Discord.MessageReaction(
      message,
      emoji,
      1,
      event.d.user_id === client.user.id
    );
  }
  client.emit(events[event.t], reaction, user);
});
client.on("messageReactionAdd", (reaction, user) => {
  if (!user.bot && reaction.message.id === "679385800412233736") {
    switch (reaction.emoji.id || reaction.emoji.name) {
      case "551077554543394827":
        client.channels
          .get("593500776920252416")
          .send(user.username + " reacted with Echo Arena");
        reaction.message.guild.member(user).addRole(roleList.get("ea"));
        break;
      case "551077555487244289":
        client.channels
          .get("593500776920252416")
          .send(user.username + " reacted with Onward");
        reaction.message.guild.member(user).addRole(roleList.get("ow"));
        break;
      case "551077555218939904":
        client.channels
          .get("593500776920252416")
          .send(user.username + " reacted with Echo Combat");
        reaction.message.guild.member(user).addRole(roleList.get("ec"));
        break;
      case "551077662798643200":
        client.channels
          .get("593500776920252416")
          .send(user.username + " reacted with Space Junkies");
        reaction.message.guild.member(user).addRole(roleList.get("sj"));
        break;
      case "679384856551227392":
        client.channels
          .get("593500776920252416")
          .send(user.username + " reacted with PW");
        reaction.message.guild.member(user).addRole(roleList.get("pw"));
        break;
      case "🇪🇺":
        client.channels
          .get("593500776920252416")
          .send(user.username + " reacted with EU");
        reaction.message.guild.member(user).addRole(roleList.get("eu"));
        reaction.message.guild.member(user).removeRole(roleList.get("na"));
        break;
      case "519923682001289217":
        client.channels
          .get("593500776920252416")
          .send(user.username + " reacted with Pistol Whip");
        reaction.message.guild.member(user).addRole(roleList.get("na"));
        reaction.message.guild.member(user).removeRole(roleList.get("eu"));
    }
  }
});
client.on("messageReactionRemove", (reaction, user) => {
  if (!user.bot && reaction.message.id === "679385800412233736") {
    switch (reaction.emoji.id || reaction.emoji.name) {
      case "551077554543394827":
        client.channels
          .get("593500776920252416")
          .send(user.username + " removed Echo Arena");
        reaction.message.guild.member(user).removeRole(roleList.get("ea"));
        break;
      case "551077555487244289":
        client.channels
          .get("593500776920252416")
          .send(user.username + " removed Onward");
        reaction.message.guild.member(user).removeRole(roleList.get("ow"));
        break;
      case "551077555218939904":
        client.channels
          .get("593500776920252416")
          .send(user.username + " removed Echo Combat");
        reaction.message.guild.member(user).removeRole(roleList.get("ec"));
        break;
      case "551077662798643200":
        client.channels
          .get("593500776920252416")
          .send(user.username + " removed Space Junkies");
        reaction.message.guild.member(user).removeRole(roleList.get("sj"));
        break;
      case "679384856551227392":
        client.channels
          .get("593500776920252416")
          .send(user.username + " reacted with Pistol Whip");
        reaction.message.guild.member(user).removeRole(roleList.get("pw"));
        break;
      case "🇪🇺":
        client.channels
          .get("593500776920252416")
          .send(user.username + " removed EU");
        reaction.message.guild.member(user).removeRole(roleList.get("eu"));
        break;
      case "519923682001289217":
        client.channels
          .get("593500776920252416")
          .send(user.username + " removed NA");
        reaction.message.guild.member(user).removeRole(roleList.get("na"));
        break;
    }
  }
});
/*╔═══════════════════════════════════════╗
    Logs
  ╚═══════════════════════════════════════╝*/
client.on("guildMemberAdd", member => {
  client.channels
    .get("566294428453699584")
    .send(`${member} joined\nMember count: ${member.guild.memberCount}`);
});
client.on("guildMemberRemove", member => {
  client.channels
    .get("566294428453699584")
    .send(
      `${member.user.username} left\nMember count: ${member.guild.memberCount}`
    );
});
client.on("guildBanAdd", function(guild, user, member) {
  client.channels
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
        name: `${user} deleted a message from ${message.author.username} in #${message.channel.name}`,
        icon_url: `${message.author.displayAvatarURL}`
      }
    }
  };
  try {
    client.channels.get("593500776920252416").send(delmsg);
  } catch (error) {
    client.channels
      .get("593500776920252416")
      .send("Deleted Messages send: " + error);
  }
});
client.login(process.env.BOT);
