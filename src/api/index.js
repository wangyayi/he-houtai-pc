//这个文件负责配置axios的基础配置
import axios from 'axios'
import auth from '@/utils/auth'
import router from '@/router'
import JSONbig from 'json-bigint'

//1.基准地址配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 2.设置请求头，但是因为现在是单页面路由跳转，不刷新页面，所以会存在拿不到数据的情况
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`
// 3. 改json转换方式
axios.defaults.transformResponse = [data => {
    // 通过json-bigint对data进行处理,处理后返回即可
    try {
        return JSONbig.parse(data)
    } catch (e) {
        return data
    }
}]
//需要一个axios的请求拦截器，每次发送请求之前要拿token数据
axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${auth.getUser().token}`
    return config
}, e => Promise.reject(e))

//响应拦截器，当token失效时，后台返回401
axios.interceptors.response.use(function (res) {
    // 对响应数据做点什么，当响应成功时执行
    return res;
}, function (error) {
    // 对响应错误做点什么，当响应失败时执行
    //判断响应状态码是401，清除本地用户信息，跳转到登录页面
    if (error.response && error.response.status === 401) {
        auth.delUser()
        router.push('/login')
    }
    return Promise.reject(error);
});
export default axios