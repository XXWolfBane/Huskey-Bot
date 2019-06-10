const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const mysql = require("mysql");
var prefix = "!"
bot.commands = new Discord.Collection();

fs.readdir("./commands" (err, files) => {
  console.log("Loading commands.");
  if (err) return console.log("Uh-oh command loading failed.")
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
  });
});

bot.on("ready", () => {
  bot.user.setStatus("Looking for commands.");
  console.log("I'm logged in.");
});

//SQL Begins here
function generateXP() {
  return Math.floor(Math.random() * (15 - 1 + 1))
} //Generates a number for XP added to player.





//SQL Ends here

bot.on("message", message => {
let mArray = message.content.split(" ")
let args = mArray.slice(1)
let cmd = bot.commands.get(mArray[0].slice(prefix.length))
if (message.author.bot) return;
if (message.channel.type == "dm") return;
if (!message.content.startsWith(prefix)) return;
  cmd.run(bot, message, args, Discord)
});

bot.login(process.env.a)
