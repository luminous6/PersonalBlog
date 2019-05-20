let tagDao = require("../dao/TagsDao");
let timeUtil = require("../util/TimeUtil");
let respUtil = require("../util/RespUtil");
let url = require("url");
let path = new Map();

function queryRandomTags(request, response) {
    tagDao.queryAllTag(function (result) {
        result.sort(()=>{
            return Math.random() > 0.5 ? true : false;
        })
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryRandomTags",queryRandomTags);



module.exports.path = path;