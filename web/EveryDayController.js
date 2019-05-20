let everyDayDao = require("../dao/EveryDayDao");
let timeUtil = require("../util/TimeUtil")
let respUtil = require("../util/RespUtil")
let url = require("url");
let path = new Map();

function editEveryDay(request,response) {
    request.on("data",function (data) {
        everyDayDao.insertEveryDay(data.toString().trim(),timeUtil.getNow(),function (result) {
            response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
        })
    })
}

path.set("/editEveryDay",editEveryDay)

function queryEveryDay(request,response) {
    everyDayDao.queryEveryDay(function (result) {

        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

path.set("/queryEveryDay",queryEveryDay)

module.exports.path = path