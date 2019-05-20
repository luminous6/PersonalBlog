let dbutil = require("./DBUtil");

function queryAllTag(success) {
    let querySql = "select * from tags";
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

function queryTag(tag,success) {
    let querySql = "select * from tags where tag = ?";
    let params = [tag];

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

function insertTag(tag,ctime,utime,success) {
    let insertSql = "insert into tags (`tag`,`ctime`,`utime`) values (?,?,?)";
    let params = [tag,ctime,utime];

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

module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;