// import './assets/main.css'
//  import Vue from 'vue';
// import VueToastify from 'vue-toastify';


 import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import 'bootstrap/dist/css/bootstrap.css';
// import { toast } from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css';










const app = createApp(App)

app.use(router)

// app.use(Vue3Toastify, {
//     autoClose: 3000,
//   } as ToastProgrammatic );
//  app.use(toast) 


app.mount('#app')
// import Vue from 'vue';
// import App from './App.vue';
// import router from './route/index.js';

// Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount('#app');



