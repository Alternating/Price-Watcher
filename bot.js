"use strict";
require('dotenv').config();
const prefix = '!';
const TOKEN = process.env.TOKEN;
const fetch = require('node-fetch');
const Discord = require('discord.js');
const bot = new Discord.Client();
var request = require('request');
const marketcap = 'https://api.coingecko.com/api/v3/simple/price?ids=syscoin&vs_currencies=vs_currency%2Cusd%2Cbtc'

//client.login('NzUxODA4Mzk4NjM4NzEwOTM0.X1OeIg.sE3gx3ZKCCXfGgDJN3KN0pjKBWY');  may get rid of the dotenv in place of this

bot.login(TOKEN);

bot.on('ready', () => {
 //    bot.guilds.cache.forEach(guild => guild.me.setNickname((await getPrice2()).toString());


console.info(`Logged in as ${bot.user.tag}!`);
});

async function getPrice() {
 let dataCoin;
 await fetch(marketcap).then(async (res) => {
     await res.json().then((data) => {
       dataCoin = data.syscoin.usd;
     });
 });
 return dataCoin;
}

//(async () => { console.log((await getPrice())) })();

async function getPrice2() {
 let dataCoin2;
 await fetch(marketcap).then(async (res) => {
     await res.json().then((data) => {
       dataCoin2 = data.syscoin.btc;
     });
 });
 return dataCoin2;
}

async function main() {
  let sysPrice = await getPrice()
  console.log(sysPrice);
  await bot.user.setActivity(`$${Math.round(sysPrice*1000)/1000} |SYSUSD|`, { type: 'WATCHING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(err => console.log(err));
//    bot.user.setUsername(`Syscoin`);
   let sysPrice2 = await getPrice2()
   console.log(sysPrice2);
 
   await bot.guilds.cache.forEach(guild => guild.me.setNickname(`${100000000*sysPrice2}    |SYSBTC|`))
    console.log(`Name set to ${100000000*sysPrice2}`);

};


(async () => { console.log((await getPrice())) })();
(async () => { console.log((await getPrice2())) })();

setInterval(() => main(), 500000);






