import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/utils/auth.js'

//引入组件,以这种方式导包，在后期打包上线时这些包会分别打包出来，在加载时不会一次性加载，跳转到哪个才会加载哪个
const Login = () => import('@/views/login/index.vue')
const Layout = () => import('@/views/Layout.vue')
const Welcome = () => import('@/views/Welcome')
const Notfound = () => import('@/views/Welcome/404.vue')
const Article = () => import('@/views/article/index')
const Image = () => import('@/views/image/index')
const Publish = () => import('@/views/publish/index')
const Comment = () => import('@/views/comment/index')
const Fans = () => import('@/views/fans/index')
const Setting = () => import('@/views/setting/index')
Vue.use(VueRouter)

const routes = [
    {
        path: '/login', component: Login
    },
    {
        path: '/',
        component: Layout,
        children: [
            { path: '/', component: Welcome },
            { path: '/articles', component: Article },
            { path: '/image', component: Image },
            { path: '/publish', component: Publish },
            { path: '/comment', component: Comment },
            { path: '/fans', component: Fans },
            { path: '/setting', component: Setting }

        ]
    },
    //当以上路由都不符合客户输入的地址时，显示404
    { path: '*', component: Notfound }

]

const router = new VueRouter({
    routes
})

//导航守卫,用来判断是否登录，如果登录有token那就可以访问，要是没有，就跳转登录页面，登录之后才可以跳转
router.beforeEach((to, from, next) => {
    const user = auth.getUser()
    //当页面不是登录页面和没有带token的时候,跳转到登录页面
    if (to.path !== '/login' && !user.token) return next('/login')


    next()
})

export default router