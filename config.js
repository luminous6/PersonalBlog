let fs = require("fs");


let globalConf = {};

let conf = fs.readFileSync("./server.conf");
let confArr = conf.toString().split("\r\n")

for (let i = 0; i < confArr.length; i++) {
    let tempKey = confArr[i].split("=")[0].trim();
    let tempVal = confArr[i].split("=")[1].trim();
    globalConf[tempKey] = tempVal
}

module.exports = globalConf