import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/utils/auth'
import Login from '@/views/login/index.vue'
import Layout from '@/views/Layout.vue'
import Welcome from '@/views/Welcome'
Vue.use(VueRouter)

const routes = [
    {
        path: '/login', component: Login
    },
    {
        path: '/',
        component: Layout,
        children: [
            { path: '/', component: Welcome }
        ]
    }

]

const router = new VueRouter({
    routes
})

//导航守卫,用来判断是否登录，如果登录有token那就可以访问，要是没有，就跳转登录页面，登录之后才可以跳转
router.beforeEach((to, from, next) => {
    const user = auth.getUser()
    if (to.path !== '/login' && !user.token) {
        alert('请先登录')
        return next('/login')
    }

    next()
})

export default router