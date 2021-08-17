module.exports.run = async (client, message, args) => {

    try{
        const code = args.join(" ");
        if (!code) return message.channel.send('Não é possivel executar este comando sem nenhum argumento!')
       let evaled = eval(code)
       if (typeof evaled !== "string")
         evaled = require("util").inspect(evaled);
       if (evaled.length > "2000" && evaled.length < "4000") {

       } else if (evaled.length > "4000" && evaled.length < "6000") {

     } else {
    message.channel.send("```" + evaled + "```")
    }
           
   }catch(err){
       message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
   }
}

module.exports.help = {
    name: "eval"
 }