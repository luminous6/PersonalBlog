let blogDao = require("../dao/BlogDao");
let tagDao = require("../dao/TagsDao");
let tagBlogMappingDao = require("../dao/TagBlogMappingDao");
let timeUtil = require("../util/TimeUtil");
let respUtil = require("../util/RespUtil");
let url = require("url");
let path = new Map();


function queryBlogById(request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogId(parseInt(params.bid),function (result) {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
        //添加查看数
        blogDao.addViews(params.bid,function (res) {
        })
    })

}
path.set("/queryBlogById", queryBlogById);


function queryAllBlog(request, response) {
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })

}
path.set("/queryAllBlog", queryAllBlog);

function queryBlogByPage(request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function (result) {
        for (var i = 0 ; i < result.length ; i ++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })

}
path.set("/queryBlogByPage", queryBlogByPage);

function queryBlogCount(request, response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })

}
path.set("/queryBlogCount", queryBlogCount)

function editBlog(request, response) {
    let params = url.parse(request.url, true).query;
    let tags = params.tags.replace(/ /g, "").replace("，", ",");
    request.on("data", function (data) {
        blogDao.insertBlog(params.title, data.toString(), 0, tags, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
            let blogId = result.insertId;
            let tagList = tags.split(",");
            console.log
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId)
            }

        })
    })

}
path.set("/editBlog", editBlog)

function queryNewHotBlog(request, response) {
    blogDao.queryNewHotBlog(7,function (result) {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })

}
path.set("/queryNewHotBlog", queryNewHotBlog);

function queryTag(tag, blogId) {
    tagDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId)
        } else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            });

        }
    })
}

function insertTag(tag, blogId) {
    tagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId)
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(),function (reslut) {

    })
}


module.exports.path = path
