const app = Vue.createApp({
    data() {
        return {
            csrf: null,
            blog: {
                title: '',
                content: '',
                posted_at: '',
                posted_by: ''
            },
            blogs: [],
            showList: true,
            showForm: false,
            showBlog: false,
        }
    },
    methods: {
        sendRequest: async function(url, method, body) {
            const requestHeaders = new Headers({
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            })
            if (method !== 'get'){
                console.log(1)
                await this.getCSRFToken()
                console.log(this.csrf)
                requestHeaders.append('X-CSRFToken', this.csrf)
            }
            const response = await fetch(url, {
                method: method,
                headers: requestHeaders,
                body: body
            })
            return response
        },
        getCSRFToken: async function() {
            if (this.csrf === null) {
                console.log(2)
                const response = await this.sendRequest('http://127.0.0.1:8000/blogs/csrf', 'get')
                const csrf_data = await response.json();
                this.csrf = csrf_data.csrf_token
            }
        },
        getBlogs: async function() {
            const response = await this.sendRequest('http://127.0.0.1:8000/blogs/','get')
            return response.json()
        },
        createPost: async function() {
            this.blogs = await this.getBlogs()

            await this.sendRequest('http://127.0.0.1:8000/blogs/', 'post', JSON.stringify(this.blog))

            this.blogs = await this.getBlogs()
            this.showList = true
            this.showForm = false
            this.showBlog = false
            
        },
        addPost: function() {
            this.showList = false
            this.showForm = true
            this.blog = {
                title: '',
                content: '',
                posted_at: '',
                posted_by: ''
            }
        },
        takeMeBack: function() {
            this.showList = true
            this.showForm = false
            this.showBlog = false
        },
        truncatedContent: function(blog) {
            var preview;
            if (blog.content.length >100) {
                preview = blog.content.split("").slice(0, 100).join("")+ '...';
            } else {
                preview = blog.content;
            }
            return preview;
        },
        formattedDate: function(blog) {
            var prettyDate;
            console.log(blog.posted_at)
            date = new Date(blog.posted_at)
            prettyDate = date.toLocaleString('en-US', { timeZone: 'UTC' });
            return prettyDate;
        },
        deleteBlog: async function(blog) {
            await this.sendRequest('http://127.0.0.1:8000/blogs/', 'delete', JSON.stringify(blog))
            this.blogs = await this.getBlogs()
        },
        readBlog: function(blog) {
            this.blog = this.blogs.find(post => post.id === blog.id)
            this.showList = false
            this.showForm = false
            this.showBlog = true
        }
    },
    async created() {
        this.blogs = await this.getBlogs()
    },
})
app.mount('#app')