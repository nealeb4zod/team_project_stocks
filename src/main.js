import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

export const eventBus = new Vue();

import VueAutosuggest from 'vue-autosuggest';
Vue.use(VueAutosuggest);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
