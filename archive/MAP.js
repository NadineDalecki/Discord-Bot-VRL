const roleList = require('../info/roles.js');
const Discord = require('discord.js');

module.exports = {
  name: 'map-ow',
  execute(message, args) {
    const msgid = args.shift();
    message.delete().catch(_ => { });
    if (message.member.roles.cache.has(roleList.get("esh")) || message.member.roles.has(roleList.get("sm")) || message.member.roles.has(roleList.get("cm")) || message.member.roles.has(roleList.get("vcc"))) {     
      function shuffle(arr) { // randomly rearanges the items in an array
  const result = [];
  for (let i = arr.length-1; i >= 0; i--) {
    // picks an integer between 0 and i:
    const r = Math.floor(Math.random()*(i+1));   // NOTE: use a better RNG if cryptographic security is needed
    // inserts the arr[i] element in the r-th free space in the shuffled array:
    for(let j = 0, k = 0; j <= arr.length-1; j++) {
      if(result[j] === undefined) {
        if(k === r) {
          result[j] = arr[i];    // NOTE: if array contains objects, this doesn't clone them! Use a better clone function instead, if that is needed. 
          break;
        }
        k++;
      }
    }
  }
  return result;
}

let mapPool = ["Suburbia", "Downfall", "Quarantine", "Bazaar", "Cargo", "Subway" ]
let maps = shuffle(mapPool)
console.log(maps)

      
      message.channel.send("Round 1: " + maps[1])
      message.channel.send("Round 2: " + maps[2])
      message.channel.send("Round 3: " + maps[3])
      message.channel.send("Round 4: " + maps[4])
      message.channel.send("Round 5: " + maps[5])
    }
  }
}
