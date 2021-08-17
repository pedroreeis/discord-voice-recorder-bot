const fs = require("fs");
const Lame = require("node-lame").Lame;
module.exports.run = async (client, message, args) => {

    const voicechannel = message.member.voice.channel;
    if(!voicechannel)  return message.channel.send("Por favor, entre em um canal de voz primeiro!");

    const connection = await voicechannel.join();
    const receiver = connection.receiver.createStream(message.member, {
        mode: "pcm",
        end: "manual"
    });

    const writer = receiver.pipe(fs.createWriteStream(`./output/recorded.pcm`));
    client.writer = writer;
    
    writer.on("finish", async () => {
        voicechannel.leave();

        if(fs.existsSync(`./output/recorded.pcm`)) {
            const encoder = new Lame({
                output: "./output/convertido.mp3",
                bitrate: 320,
            }).setFile("./output/recorded.pcm");
            
            encoder
                .encode()
                .then(() => {
                    message.channel.send("Sua gravação foi convertida e será enviada em instantes!");
                    message.channel.send("Aqui está sua gravação:", {
                        files: [
                            "./output/convertido.mp3"
                        ]
                    })
                })
                .catch((error) => {
                    console.log("ERROR: " + error)
                });
        }
    });
}

module.exports.help = {
    name: "gravar"
 }