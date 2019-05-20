//每日一句
let everyDay = new Vue({
    el: "#every-day",
    data: {
        content: []
    },
    computed: {},
    created: function () {
        //请求数据
        axios({
            method: "get",
            url: "/queryEveryDay",

        }).then(res => {
            this.content = res.data.data
        })


    }
})

//博客文章
let articleList = new Vue({
    el: "#article-list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleArr: [
            {
                title: "git-bash设置ssh心跳包防超时断开",
                content: "Windows中使用git-bash作为日常终端工具，在使用ssh命令连接到服务器后，如果较长时间没进行交互时，ssh会断开，导致的现象就是终端卡住，你只能等待它退出，或直接关闭窗口重建连接，很麻烦。使用ssh命令时，可以增加ServerAliveInterval参数设置心跳时间，比如设置60秒发送一次心跳包ssh -o ServerAliveInterval=60 root@xx.xx.xx.xx想一劳永逸，可以在ssh-config中配置全局参数在git安装...",
                views: 1293,
                id: 1,
                time: "2018-12-13",
                link: ""
            },
            {
                title: "git-bash设置ssh心跳包防超时断开",
                content: "Windows中使用git-bash作为日常终端工具，在使用ssh命令连接到服务器后，如果较长时间没进行交互时，ssh会断开，导致的现象就是终端卡住，你只能等待它退出，或直接关闭窗口重建连接，很麻烦。使用ssh命令时，可以增加ServerAliveInterval参数设置心跳时间，比如设置60秒发送一次心跳包ssh -o ServerAliveInterval=60 root@xx.xx.xx.xx想一劳永逸，可以在ssh-config中配置全局参数在git安装...",
                views: 1243,
                id: 2,
                time: "2018-12-13",
                link: ""
            }
        ]
    },
    computed: {
        pageList: function () {
            return this.pageNumList
        }
    },
    created: function () {
        this.getBlogList(this.page, this.pageSize);
    },
    methods: {
        getBlogList: async function (page, pageSize) {
            let res = await axios({
                method: "get",
                url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize,
            })
            let data = res.data.data
            for (let i = 0;i<data.length;i++){
                data[i].link = '/blog_detail.html?bid='+data[i].id
            }
            this.articleArr = data;

            this.queryBlogCount()

        },
        generatePageTool: function () {
            let nowPage = this.page;
            let pageSize = this.pageSize;
            let totalCount = this.count;
            let result = [];
            result.push({text: "上一页", page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage - 1});
            }
            result.push({text: nowPage, page: nowPage});
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 2, page: nowPage + 2});
            }
            result.push({text: "下一页", page: parseInt((totalCount + pageSize - 2) / pageSize)});
            this.pageNumList = result;
            // this.pageNumList.splice(0, (this.pageNumList.length - 1), result)

            return result;

        },
        queryBlogCount: function () {
            let self = this;
            axios({
                method: "get",
                url: "/queryBlogCount"
            }).then(function (resp) {
                self.count = resp.data.data[0].count;
                self.generatePageTool();
            });

        },
        jumpTo: function(page) {
                this.getBlogList(page, this.pageSize);
                this.page = page
        },
    },

})
