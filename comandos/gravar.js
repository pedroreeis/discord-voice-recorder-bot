const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const voicechannel = message.member.voice.channel;
    if(!voicechannel)  return message.channel.send("Por favor, entre em um canal de voz primeiro!");

    const connection = await voicechannel.join();
    const receiver = connection.receiver.createStream(message.member, {
        mode: "pcm",
        end: "silence"
    });

    const writer = receiver.pipe(fs.createWriteStream(`./call.pcm`));
    writer.on("finish", () => {
        voicechannel.leave();
        message.channel.send("Gravado com sucesso.");
    });
}

module.exports.help = {
    name: "gravar"
 }