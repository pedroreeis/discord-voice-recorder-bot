const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const voicechannel = message.member.voice.channel;
    if(!voicechannel)  return message.channel.send("Por favor, entre em um canal de voz primeiro!");

    client.writer.end();
}

module.exports.help = {
    name: "parar"
 }