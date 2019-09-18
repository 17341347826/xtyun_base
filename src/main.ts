import Vue from 'vue';
import './plugins/axios';
import './plugins/element.js';
import './plugins/custom';
import App from './App.vue';
import router from './router';
import store from './store';

import '@babel/polyfill';

Vue.config.productionTip = false;

window.document.title = '学唐云.基础模块';


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
