import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import echarts from 'echarts'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './uilt/http/index'

import './style/main.css'

// 全局注册component
import Component from '@/uilt/components'
Vue.use(Component)

import request from './uilt/ajax/ajax' // 引入自己的axios
Vue.prototype.$request = request

Vue.use(ViewUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Array.prototype.remove = function(b) {
  var a = this.indexOf(b);
  if (a >= 0) {
  this.splice(a, 1);
  return true;
  }
  return false;
  };

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
