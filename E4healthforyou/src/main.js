import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import { BModal } from 'bootstrap-vue';
import VueCookies from 'vue-cookies';
// import { BButton, BModal, BFormInput, BFormGroup } from 'bootstrap-vue';













const app = createApp(App);
// app.component('BButton', BButton);
// app.component('BModal', BModal);
// app.component('BFormInput', BFormInput);
// app.component('BFormGroup', BFormGroup);

app.use(router);

// app.component('custmoreRegistration', BModal);

app.use(VueCookies);

app.mount('#app')
// import Vue from 'vue';
// import App from './App.vue';
// import router from './route/index.js';

// Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount('#app');



