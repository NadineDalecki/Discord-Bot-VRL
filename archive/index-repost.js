  /*╔═══════════════════════════════════════╗
     Repost
  ╚═══════════════════════════════════════╝
  const cont = message.content
  let embed = {"embed": {"description": cont}}
  let url = null;
  if (message.author.bot){ 
    if (message.attachments.size > 0) {
      message.attachments.map(attachment => {
        url = attachment.url;
      })
      if( url != null) {
        embed = { "embed": { "image": { "url": url } } }
      }
      if (cont.length >= 2 || url != null && cont.length <1 ) {
        if (message.channel.id === "563835518219976730") {  //EA
          client.channels.get("564501656323096586").send(embed); 
        } 
        else if (message.channel.id === "563835476520337411") {   //OW
          client.channels.get("564502301952311296").send(embed); 
        } 
        else if (message.channel.id === "563835561597730837") {   //EC
          client.channels.get("564511050636984341").send(embed); 
        } 
        else if (message.channel.id === "579224999173292042") {   //Stream
          client.channels.get("593500776920252416").send(embed); 
        } 
      }
    }
    else {
      if (message.channel.id === "563835518219976730") {  //EA
        client.channels.get("564501656323096586").send(embed); 
      } 
      else if (message.channel.id === "563835476520337411") {   //OW
        client.channels.get("564502301952311296").send(embed); 
      } 
      else if (message.channel.id === "563835561597730837") {   //EC
        client.channels.get("564511050636984341").send(embed); 
      } 
      else if (message.channel.id === "579224999173292042") {   //Stream
        client.channels.get("593500776920252416").send(embed); 
      } 
    }
  } 