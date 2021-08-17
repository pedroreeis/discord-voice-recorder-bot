// Vamos começar fazendo uma index básica, pois nosso objetivo é um bot simples mas com seu objetivo principal.
const { Client, Collection } = require('discord.js');
const client = new Client();

client.commands = new Collection();

const fs = require("fs");
fs.readdir("./comandos/", (err, files) => {
    if (err) return console.error(err);

    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        let command = require(`./comandos/${f}`);
        client.commands.set(command.help.name, command);
        console.log(`Comando ${command.help.name} carregado.`)
    });
});

client.once("ready", () => {
    console.log("Hello Word!");
});

client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;

    const prefixo = "!"

    if (!message.content.startsWith(prefixo)) return;
    let args = message.content.slice(prefixo.length).trim().split(" ");
    let command = args.shift().toLowerCase();
    let commandFile = client.commands.get(command);
    if (!commandFile) return;
    commandFile.run(client, message, args);
});

client.login("Njc0NzM4Mzg1NjI5NDc4OTM5.Xjs9Fw.GvPQcfTUL5FHeDrzPVwNeUsp1aI");
