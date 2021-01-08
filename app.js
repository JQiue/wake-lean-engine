const https = require('https');
const http = require('http');

http.createServer((req, res) => {
  res.end("OK!!!")
}).listen(3000)

function wake(url) {
  https.get(url, res => {
    if (res.statusCode == 200) {
      console.log(url + "=> 唤醒成功，StatusCode：" + res.statusCode);
    } else {
      console.log(url + "=> 唤醒失败，StatusCode" + res.statusCode);
    }
  })
}

const callUrl = "https://jqiue.avosapps.us/"
const wake1 = "https://wake1.avosapps.us/"
const wake2 = "https://wake2.avosapps.us/"

setInterval(() => {
  let hour = (new Date().getHours() + 8) % 24;
  console.log("current time：" + hour);
  if (hour >= 12 && hour <= 23) {
    wake(wake1)
    if (hour <= 1 || hour >= 8) {
      wake(callUrl)
    }
  } else {
    wake(wake2)
    if (hour <= 1 || hour >= 8) {
      wake(callUrl)
    }
  }
}, 1650000);
