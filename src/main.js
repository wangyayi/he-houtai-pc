//导入vue
import Vue from 'vue';
//导入依赖的ui模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入根组件
import App from './App.vue';
//导入自己的路由模块
import router from '@/router';

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
