let blogDetail = new Vue({
    el: "#article-detail",
    data: {
        blogTitle: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    created: function () {
        this.getBlogDetail()
    },
    methods: {
        //请求数据
        getBlogDetail: async function () {
            let searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
            let bid = searcheUrlParams[0].split("=")[1]
            let {data} = await axios({
                method: "get",
                url: "/queryBlogById?bid=" + bid
            })
            this.blogTitle = data.data[0].title
            this.content = data.data[0].content
            this.ctime = data.data[0].ctime
            this.tags = data.data[0].tags
            this.views = data.data[0].views
        }
    }

});

let sendComment = new Vue({
    el: "#send-comment",
    data: {
        reply: -1,
        vcode: "",
        rightCode: "",
        isRightCode: false

    },
    created: function () {
        this.randomCaptcha()
    },
    methods: {
        //提交评论
        submitComment: function () {
            let searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
            let bid = searcheUrlParams[0].split("=")[1];
            let reply = this.$refs.reply.value;
            let parentName = this.$refs.commentParent.value;
            let commentName = this.$refs.commentName.value;
            let commentEmail = this.$refs.commentEmail.value;
            let commentContent = this.$refs.commentContent.value;
            let captcha = this.$refs.captcha.value;

            if (captcha != this.rightCode) {
                this.isRightCode = true;
                this.randomCaptcha()
                return;
            }
            axios({
                method: "get",// + "&parentName=" + replyName
                url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + commentName + "&email=" + commentEmail + "&content=" + commentContent+ "&parentName=" + parentName
            })
            this.clearComment()
        },
        //随机验证码
        randomCaptcha: async function () {
            let {data} = await axios({
                method: "get",
                url: "/queryRandomCode"
            })
            this.vcode = data.data.data;
            this.rightCode = data.data.text;

        },
        //清空评论
        clearComment: function () {
            this.$refs.commentName.value = "";
            this.$refs.commentEmail.value = "";
            this.$refs.commentContent.value = "";

        }
    }
});

let blogComments = new Vue({
    el: "#blog-comments",
    data: {
        commentCount:0,
        commentsList: []
    },
    created: function () {
        this.queryCommentsByBlogId()
        this.queryCommentsCountByBlogId()
    },
    methods: {
        //查询博客评论By ID
        queryCommentsByBlogId: async function () {
            let searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
            let bid = searcheUrlParams[0].split("=")[1];
            let res = await axios({
                method: "get",
                url: "/queryCommentsByBlogId?bid=" + bid
            });
            this.commentsList = res.data.data
            for (var i = 0 ; i < this.commentsList.length ; i ++) {
                if (this.commentsList[i].parent > -1) {
                    this.commentsList[i].options = "回复@" + this.commentsList[i].parent_name;
                }
            }
        },
        //查询博客评论总数By ID
        queryCommentsCountByBlogId: function () {
            let searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
            let bid = searcheUrlParams[0].split("=")[1];
            axios({
                method: "get",
                url: "/queryCommentsCountByBlogId?bid=" + bid
            }).then(function (res) {
                blogComments.commentCount = res.data.data[0].count
            })
        },
        reply: function(commentId,userName) {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send-comment";
        }
    }
})