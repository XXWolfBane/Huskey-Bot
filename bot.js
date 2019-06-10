const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const mysql = require("mysql");
var prefix = "!"
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  console.log("Loading commands...");
  if (err) return console.log(`Command loading failed!`);
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

var con = new mysql.createConnection({
  host: "remotemysql.com",
  user: "kOKPHyqSH0",
  password: process.env.b,
  database: "kOKPHyqSH0"
})
bot.on("message", message => {
con.query(`SELECT * FROM userdatabase WHERE userid = ${message.author.id}`, (err, rows) => {
    if (err) throw err
    if (message.content = "!xp") return;
    if (message.author.bot) return;
  
    let sql;
  
    if (rows.length < 1) {
      sql = `INSERT INTO userdatabase (userid, xp, ubl, globalxpsus) VALUES ('${message.author.id}', ${generateXP()}, '0', '0')`
    } else {
    let xp = rows[0].xp;
      sql = `UPDATE userdatabase SET xp = ${xp + generateXP()} WHERE id = ${message.author.id}`
    }
    
  con.query(sql, console.log)
  })
}) // Lord this is ugly





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
