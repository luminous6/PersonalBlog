let commentsDao = require("../dao/CommentsDao");
let timeUtil = require("../util/TimeUtil");
let respUtil = require("../util/RespUtil");
let captcha = require("svg-captcha");
let url = require("url");
let path = new Map();

function addComment(request, response) {
    let params = url.parse(request.url,true).query;
    commentsDao.insertComment(parseInt(params.bid),params.parent,params.parentName,params.userName,params.content,params.email,timeUtil.getNow(),timeUtil.getNow(),function (result) {
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.write(respUtil.writeResult("success","评论成功",null));
        response.end();
    })
}
path.set("/addComment",addComment)

function queryRandomCode(request, response) {
    let img = captcha.create({fontSize: 40, width: 90, height: 34})
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    response.write(respUtil.writeResult("success", "随机验证码", img));
    response.end();
}
path.set("/queryRandomCode",queryRandomCode)

function queryCommentsByBlogId(request, response) {
    let params = url.parse(request.url,true).query;
    commentsDao.queryCommentsByBlogId(parseInt(params.bid),function (reslut) {
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.write(respUtil.writeResult("success", "查询成功", reslut));
        response.end();
    })

}
path.set("/queryCommentsByBlogId",queryCommentsByBlogId)

function queryCommentsCountByBlogId(request, response) {
    let params = url.parse(request.url,true).query;
    commentsDao.queryCommentsCountByBlogId(parseInt(params.bid),function (reslut) {
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.write(respUtil.writeResult("success", "查询成功", reslut));
        response.end();
    })

}
path.set("/queryCommentsCountByBlogId",queryCommentsCountByBlogId)

function queryNewComments(request, response) {
    let params = url.parse(request.url,true).query;
    commentsDao.queryNewComments(5,function (reslut) {
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.write(respUtil.writeResult("success", "查询成功", reslut));
        response.end();
    })

}
path.set("/queryNewComments",queryNewComments)

module.exports.path = path