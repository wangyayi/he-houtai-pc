import Vue from 'vue'
import VueRouter from 'vue-router'
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

export default router