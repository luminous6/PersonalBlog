let dbutil = require("./DBUtil");

function insertTagBlogMapping(tagId,blogId,ctime,utime,success) {
    let insertSql = "insert into tag_blog_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) values (?,?,?,?)";
    let params = [tagId,blogId,ctime,utime];

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


module.exports.insertTagBlogMapping = insertTagBlogMapping;