const https = require('https');
const http = require('http');

const wakeInterval = Number(process.env.INTERVAL_TIME) || 1500000;
const hour = (new Date().getHours() + 8) % 24;

console.log('间隔唤醒时间：' + wakeInterval);

function wake(url) {
  https.get(url, res => {
    res.statusCode == 200 ? console.log(url + "=> 唤醒成功，StatusCode：" + res.statusCode) : console.log(url + "=> 唤醒失败，StatusCode：" + res.statusCode)
  })
}

if (process.env.NODE_ENV) {
  console.log('development environment');
  const callUrl = "https://jqiue.avosapps.us/";
  const wake1 = "https://wake1.avosapps.us/";
  const wake2 = "https://wake2.avosapps.us/";
  setInterval(() => {
    console.log("current hour：" + hour);
    if (hour >= 12 && hour <= 23) {
      wake(wake1);
      if (hour <= 1 || hour >= 8) {
        wake(callUrl);
      }
    } else {
      wake(wake2);
      if (hour <= 1 || hour >= 8) {
        wake(callUrl);
      }
    }
  }, wakeInterval);
} else {
  console.log('production environment');
  const url_list = process.env.CALL_URLS.split(';');
  const wake1 = process.env.WAKE1;
  const wake2 = process.env.WAKE2;
  setInterval(() => {
    console.log("current hour：" + hour);
    if (hour >= 12 && hour <= 23) {
      wake(wake1);
      if (hour <= 1 || hour >= 8) {
        url_list.forEach(url => {
          wake(url);
        });
      }
    } else {
      wake(wake2);
      if (hour <= 1 || hour >= 8) {
        url_list.forEach(url => {
          wake(url);
        });
      }
    }
  }, wakeInterval);
}

http.createServer((req, res) => {
  res.end("OK!!!")
}).listen(3000);