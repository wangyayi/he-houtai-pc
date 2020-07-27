//导入vue
import Vue from 'vue';
//导入依赖的ui模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入根组件
import App from './App.vue';
//导入自己的路由模块
import router from '@/router';

//导入自己的全局样式
import '@/styles/index.less'


//导入axios
import axios from '@/api';
// import axios from 'axios'

//挂载到Vue原型对象
Vue.prototype.$http = axios;


Vue.use(ElementUI);
Vue.config.productionTip = false;

//导入自己封装的插件并使用
import myPlugin from '@/plugin.js';
Vue.use(myPlugin);
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
