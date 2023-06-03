"use strict";
process.settings = require("./settings.json");
const prefix = '!';
const rate = process.settings.timer.checkrate;
const TOKEN = process.settings.discord.token;
const coin = process.settings.coin.type;
const fetch = require('node-fetch');
const Discord = require('discord.js');
const bot = new Discord.Client();
var request = require('request');

bot.login(TOKEN);

bot.on('ready', () => {
 //    bot.guilds.cache.forEach(guild => guild.me.setNickname((await getPrice2()).toString());
console.info(`Logged in as ${bot.user.tag}!`);
//console.log(marketcap);
});

const axios = require('axios');


async function getPrice() {
  let datacoin;
	await axios.get('https://query1.finance.yahoo.com/v8/finance/chart/' + (coin))
  	.then(response => {
    	const data = response.data;
    	const currentPrice = data.chart.result[0].meta.regularMarketPrice;
    	const previousPrice = data.chart.result[0].meta.chartPreviousClose;
    	const change = currentPrice - previousPrice;
    	const changePercent = (change / previousPrice) * 100;
    datacoin = currentPrice
    console.log(`${datacoin}`);
    //console.log(`${changePercent.toFixed(2)}%`);
  })
  .catch(error => {
    console.log('Error fetching price:', error);
  });
return datacoin;

}

async function getPercent() {
  let Percent;
        await axios.get('https://query1.finance.yahoo.com/v8/finance/chart/' + (coin))
        .then(response => {
        const data = response.data;
        const currentPrice = data.chart.result[0].meta.regularMarketPrice;
        const previousPrice = data.chart.result[0].meta.chartPreviousClose;
        const change = currentPrice - previousPrice;
        const changePercent = (change / previousPrice) * 100;
    Percent = changePercent
    console.log(`${Percent}`);
    //console.log(`${changePercent.toFixed(2)}%`);
  })
  .catch(error => {
    console.log('Error fetching percent:', error);
  });
return Percent;

}



async function main() {
  
 let sysPrice = await getPrice()
 let mathprice = Math.round(((sysPrice) + Number.EPSILON) * 10000) / 10000  
 console.log(sysPrice);
    await bot.guilds.cache.forEach(guild => guild.me.setNickname(`$${mathprice}    |USD|`))
// end price grab
  let sysPercent = await getPercent()
  let mathPercent = Math.round(((sysPercent) + Number.EPSILON) * 100) / 100
   await bot.user.setActivity(`${mathPercent}% |24hr|`, { type: 'PLAYING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(err => console.log(err));
// end percent grab

   if ((sysPercent) > 0) await bot.user.setStatus('available')
   if ((sysPercent) < 0) await bot.user.setStatus('dnd')};
// sets status from green to red and vice versa to correlate with a positive % return or negative % return


setInterval(() => main(), (rate));


