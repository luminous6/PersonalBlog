let fs = require("fs");

let globalConf = require("./config");
let pathMap = new Map();
let controllerSet = [];
//将所有的URL对应的方法全部导入到pathMap中
let files = fs.readdirSync(globalConf["web_path"]);
for (let i = 0; i < files.length; i++) {
    let temp = require(`./${globalConf["web_path"]}/${files[i]}`);
    if (temp.path) {
        for (let [key, val] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, val)
            } else {
                throw new Error("url path 异常，url:" + key)
            }
            controllerSet.push(temp)
        }
    }
}

module.exports = pathMap