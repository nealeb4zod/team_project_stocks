import Vue from 'vue';
import App from './App.vue';

import HighchartsVue from 'highcharts-vue';
Vue.use(HighchartsVue);

Vue.config.productionTip = false;

export const eventBus = new Vue();

import VueAutosuggest from 'vue-autosuggest';
Vue.use(VueAutosuggest);

Vue.use(require('vue-moment'));

new Vue({
  render: (h) => h(App),
}).$mount('#app');
