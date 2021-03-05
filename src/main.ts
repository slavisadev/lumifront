import Vue from 'vue'
import TheApp from './TheApp.vue'
import VueCompositionAPI from '@vue/composition-api';
import router from './router'
import store from './store'

Vue.use(VueCompositionAPI);

Vue.config.productionTip = false

require('./assets/main.scss');

new Vue({
  router,
  store,
  render: h => h(TheApp)
}).$mount('#app')
