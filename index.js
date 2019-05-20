let express = require("express");
let app = new express();
//引入全局配置
let globalConf = require("./config");
//引入loader集合
let loader = require("./loader");

//静态资源处理中间件
app.use(express.static("./page/"));

//数据请求处理
app.post("/editEveryDay",loader.get("/editEveryDay"));
app.get("/queryEveryDay",loader.get("/queryEveryDay"));

app.post("/editBlog",loader.get("/editBlog"));
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"));
app.get("/queryBlogCount",loader.get("/queryBlogCount"));
app.get("/queryBlogById",loader.get("/queryBlogById"));


app.get("/addComment",loader.get("/addComment"));
app.get("/queryRandomCode",loader.get("/queryRandomCode"));
app.get("/queryCommentsByBlogId",loader.get("/queryCommentsByBlogId"));
app.get("/queryCommentsCountByBlogId",loader.get("/queryCommentsCountByBlogId"));

app.get("/queryAllBlog",loader.get("/queryAllBlog"));


app.get("/queryRandomTags",loader.get("/queryRandomTags"));
app.get("/queryNewHotBlog",loader.get("/queryNewHotBlog"));
app.get("/queryNewComments",loader.get("/queryNewComments"))

app.listen(globalConf.port, function () {
    console.log("服务已启动！")
});