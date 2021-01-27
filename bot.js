"use strict";
require('dotenv').config();
const prefix = '!';
const TOKEN = process.setting.discord.token;
const coin = process.settings.coin.type;
const fetch = require('node-fetch');
const Discord = require('discord.js');
const bot = new Discord.Client();
var request = require('request');
const marketcap = 'https://api.coingecko.com/api/v3/simple/price?ids='+ (coin) + '&vs_currencies=vs_currency%2Cusd%2Cbtc'



bot.login(TOKEN);

bot.on('ready', () => {
 //    bot.guilds.cache.forEach(guild => guild.me.setNickname((await getPrice2()).toString());


console.info(`Logged in as ${bot.user.tag}!`);
});

async function getPrice() {
 let dataCoin;
 await fetch(marketcap).then(async (res) => {
     await res.json().then((data) => {
       dataCoin = [data][(coin)][usd];
     });
 });
 return dataCoin;
}

//(async () => { console.log((await getPrice())) })();

async function getPrice2() {
 let dataCoin2;
 await fetch(marketcap).then(async (res) => {
     await res.json().then((data) => {
       dataCoin2 = [data][(coin)][btc];
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






