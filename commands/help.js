module.exports.run = (bot, message, args, Discord, con) => {
  let em = new Discord.RichEmbed()
  .setTitle("Help Menu!")
  .setDescription("All of my commands will be listed here.")
  .addField("And then:", "there was light.")
  message.channel.send({embed:em})
}

module.exports.help = {
  name: "help"
}
