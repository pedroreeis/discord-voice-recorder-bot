const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const voicechannel = message.member.voice.channel;
    if(!voicechannel)  return message.channel.send("Por favor, entre em um canal de voz primeiro!");

    if(!fs.existsSync(`./output/recorded.pcm`)) return message.channel.send('Não gravou ainda...')

    const connection = await voicechannel.join();
    const stream = fs.createReadStream(`./output/recorded.pcm`);

    const dispatcher = connection.play(stream, {
        type: "converted"
    });

    dispatcher.on("finish", () => {
        voicechannel.leave();
        return message.channel.send("Reproduzido...")
    })
}

module.exports.help = {
    name: "play"
 }