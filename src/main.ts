import Vue from 'vue';
import VueSVGIcon from 'vue-svgicon';
import ElementUI from 'element-ui';

import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/styles/element-ui.css';
import '@/assets/styles/index.sass';

import App from './App.vue';

Vue.config.productionTip = false;

locale.use(lang);

Vue.use(ElementUI);
Vue.use(VueSVGIcon);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
