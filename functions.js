const dialogflow = require("@google-cloud/dialogflow");

module.exports = {
  dialogflowQuery: async function(message) {
    const config = {
      credentials: {
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.CLIENT_EMAIL
      }
    };

    const sessionClient = new dialogflow.SessionsClient(config);
    const sessionPath = sessionClient.projectAgentSessionPath(
      process.env.PROJECT_ID,
      message.author.id
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message.cleanContent,
          languageCode: "en-US"
        }
      }
    };

    const result = await sessionClient.detectIntent(request);
    const intent = result[0].queryResult.intent.displayName;
    const response = result[0].queryResult.fulfillmentText;
    return { result, intent, response };
  },
  inform: function(client, message, answer) {
    if (!message.channel.name){ 
      if (!(answer.intent.substring (0, 4) === "Spam")) {
      client.users.cache
        .get("338649491894829057")
        .send(
          `**${message.author.username} | DM:** ${message}\n**Mel:** ${answer.response}`
        );
    } }else {
      client.users.cache
        .get("338649491894829057")
        .send(
          `**${message.author.username} | ${message.channel.name}:** ${message}\n**Bot:** ${answer.response}\n${message.url}`
        );
    }
  },
  mention: function(client, message, id) {
    client.users.cache
      .get(id)
      .send(
        `**${message.author.username} | ${message.channel.name}:** ${message}\n**Bot:** ${message.content}\n${message.url}`
      );
  }
};