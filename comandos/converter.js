const fs = require("fs");
const Lame = require("node-lame").Lame;
module.exports.run = async (client, message, args) => {

    if(!fs.existsSync(`./output/recorded.pcm`)) return message.channel.send('Não gravou ainda...')

   const encoder = new Lame({
    output: "./output/convertido.mp3",
    bitrate: 192,
}).setFile("./output/recorded.pcm");

encoder
    .encode()
    .then(() => {
        message.channel.send("Sua gravação foi convertida e está pronta para ser reproduzida na raiz do projeto!");
    })
    .catch((error) => {
        console.log("ERROR: " + error)
    });

}

module.exports.help = {
    name: "converter"
 }