let siteMap = new Vue({
    el:"#content",
    data:{
        blogList:[]
    },
    created:function () {
        this.queryAllBlog()
    },
    methods:{
        queryAllBlog:async function () {
            let res = await axios({
                method:"get",
                url:"/queryAllBlog"
            })
            let data = res.data.data;
            for (let i = 0; i < data.length; i++) {
                data[i].link = '/blog_detail.html?bid='+data[i].id
            }
            this.blogList = data
        }
    }
})
