import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import socketPlugin from './plugins/socket';

Vue.config.productionTip = false;

Vue.use(socketPlugin, { store }); // 여기서 store를 전달

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');
