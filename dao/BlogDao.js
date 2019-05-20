let dbutil = require("./DBUtil");

function queryBlogId(id,success) {
    let querySql = "select * from blog where id=?";
    let params = [id];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (err, result) {
        if(err == null){
            success(result)
        }else{
            console.log(err)
        }

    })
    connection.end();
}

function queryBlogCount(success) {
    let querySql = "select count(1) as count from blog";
    let params = [];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (err, result) {
        if(err == null){
            success(result)
        }else{
            console.log(err)
        }

    })
    connection.end();
}

function queryAllBlog(success) {
    let querySql = "select *  from blog order by id desc";
    let params = [];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (err, result) {
        if(err == null){
            success(result)
        }else{
            console.log(err)
        }

    })
    connection.end();
}

function queryBlogByPage(page,pageSize,success) {
    let querySql = "select * from blog order by id limit ?,?";
    let params = [page * pageSize,pageSize];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (err, result) {
        if(err == null){
            success(result)
        }else{
            console.log(err)
        }

    })
    connection.end();
}

function insertBlog(title,content,views,tags,ctime,utime,success) {
    let insertSql = "insert into blog (`title`,`content`,`views`,`tags`,`ctime`,`utime`) values (?,?,?,?,?,?)";
    let params = [title,content,views,tags,ctime,utime];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (err, result) {
        if(err == null){
            success(result)
        }else{
            console.log(err)
        }

    })
    connection.end();
}

function addViews(blogId,success) {
    let updataSql = "update blog set views = views + 1 where id = ?;";
    let params = [blogId];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(updataSql,params,function (err, result) {
        if(err == null){
            success(result)
        }else{
            console.log(err)
        }

    })
    connection.end();
}

function queryNewHotBlog(size,success) {
    let querySql = "select * from blog order by views limit ?";
    let params = [size];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (err, result) {
        if(err == null){
            success(result)
        }else{
            console.log(err)
        }

    })
    connection.end();
}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogId = queryBlogId;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryNewHotBlog = queryNewHotBlog;