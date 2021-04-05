const https = require('https');
const http = require('http');
const wakeInterval = Number(process.env.INTERVAL_TIME) || 60000;
const consoleLog = process.env.LOG || 1;
const startHour = process.env.START_HOUR || 8;
const endHour = process.env.END_HOUR || 2;
const wake1 = process.env.WAKE1;
const wake2 = process.env.WAKE2;
const url_list = process.env.CALL_URLS.split(';');
const currenStartUpHour = (new Date().getHours() + 8) % 24;

function wake(url) {
  https.get(url, res => {
    consoleLog ? res.statusCode == 200 ? console.log(url + "=> 唤醒成功") : console.log(url + "=> 唤醒失败") : null;
  })
}

function startWake() {
  currenStartUpHour >= 12 && currenStartUpHour <= 23 ? wake(wake1) : wake(wake2);
  setInterval(() => {
    const currentHour = (new Date().getHours() + 8) % 24;
    if (currentHour >= 12 && currentHour <= 23) {
      wake(wake1);
      currentHour >= startHour || currentHour < endHour ? url_list.forEach(url => wake(url)) : null;
    } else {
      wake(wake2);
      currentHour >= startHour || currentHour < endHour ? url_list.forEach(url => wake(url)) : null;
    }
  }, wakeInterval);
}

startWake();

http.createServer((req, res) => {
  res.end("OK!!!")
}).listen(3000);