let dbutil = require("./DBUtil");


function insertComment(blogId, parent,parentName, userName,  comments, email, ctime, utime, success) {
    let insertSql = "insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`comments`,`email`,`ctime`,`utime`) values (?,?,?,?,?,?,?,?)";
    let params = [blogId, parent,parentName,userName, comments, email, ctime, utime];

    let connection = dbutil.createConnection()
    connection.connect()
    connection.query(insertSql, params, function (err, result) {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}

function queryCommentsCountByBlogId(blogId,success) {
    let querySql = "select count(1) as count from comments where blog_id = ?";
    let params = [blogId];

    let connection = dbutil.createConnection()
    connection.connect()
    connection.query(querySql, params, function (err, result) {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}

function queryCommentsByBlogId(blogId,success) {
    let querySql = "select * from comments where blog_id = ?";
    let params = [blogId];

    let connection = dbutil.createConnection()
    connection.connect()
    connection.query(querySql, params, function (err, result) {
        if (err == null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}

function queryNewComments(size,success){
    let querySql = "select * from comments order by id desc limit ?";
    let params = [size];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (err, result) {
        if (err == null) {
            success(result)
        }else{
            console.log(err)
        }
    })
}

module.exports.insertComment = insertComment;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryNewComments = queryNewComments;