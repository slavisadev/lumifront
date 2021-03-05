import Vue from 'vue';
import App from './App.vue';
import VueCompositionAPI from '@vue/composition-api';
import router from './router';
import store from './store';
Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;
require('./assets/main.scss');
new Vue({
    router: router,
    store: store,
    render: function (h) { return h(App); }
}).$mount('#app');
//# sourceMappingURL=main.js.map