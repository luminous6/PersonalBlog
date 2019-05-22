let randomTags = new Vue({
    el: "#random-tag",
    data: {
        tags: ["PHP", "java", "node", "js", "Vue", "Bootstrap", "jquery", "python", "PHP", "java", "node", "js", "Vue", "Bootstrap", "jquery", "python"]
    },
    computed: {
        randomColor() {
            return function () {
                let red = Math.random() * 255;
                let green = Math.random() * 255;
                let bule = Math.random() * 255;
                return `rgb(${red},${green},${bule}`
            }
        },
        randomSize() {
            return function () {
                return Math.random() * 25 + 'px'
            }
        }
    },
    computed:{

    },
    created: function () {
        this.queryRandomTags()
    },
    methods: {
        queryRandomTags: async function () {
            let res = await axios({
                method: "get",
                url: "/queryRandomTags"
            })
            this.tags = res.data.data;
        }
    }
});

let newHot = new Vue({
    el: "#new-hot",
    data: {
        newHotList: [
            {title: "查看你的AWS服务器已使用流量", link: ""},
            {title: "VirtualBox压缩vmdk、vagrant打包b", link: ""},
            {title: "使用码云git的webhook实现生产环境代", link: ""},
            {title: "python+selenium自动登录qq空间并下载", link: ""},
            {title: "vscode+XDebug调试远程环境(虚拟机", link: ""},
            {title: "查看你的AWS服务器已使用流量", link: ""},
            {title: "查看你的AWS服务器已使用流量", link: ""},
        ]
    },
    created: function () {
        this.queryNewHotBlog();
    },
    methods: {
        queryNewHotBlog: async function () {
            let res = await axios({
                method: "get",
                url: "/queryNewHotBlog"
            })
            let data = res.data.data;
            for (let i = 0; i < data.length; i++) {
                data[i].link = '/blog_detail.html?bid=' + data[i].id
            }
            this.newHotList = data
        }
    }
});

let newComments = new Vue({
    el: "#new-comments",
    data: {
        commentsList: [],
    },
    created: function () {
        this.queryNewComments()
    },
    methods: {
        queryNewComments: async function () {
            let res = await axios({
                method: "get",
                url: "/queryNewComments"
            })
            let data = res.data.data;
            this.commentsList = data;
        }


    }

});


Vue.filter('dataFormat', function formatDateTime(timeStamp) {
    let date = new Date();
    date.setTime(timeStamp * 1000);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
});


