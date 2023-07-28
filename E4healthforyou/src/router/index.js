import { createRouter, createWebHistory } from 'vue-router';

import Signup from '../components/Signup.vue';
import Login from '../components/Login.vue';

import ForgotPassword from '../components/ForgotPassword.vue';
import customer from '../components/customer.vue';
import resetPass from '../components/resetPass.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      
    },
    
      
    {
      path: '/Forgotpassword',
      name: 'Forgotpassword',
      component: ForgotPassword,
    },
    
    {
      path: '/customer', // Add the parameter for patient ID
      name: 'customer',
      component: customer,
    },
    {


      
        path: '/resetPass',
        name: 'resetPass',
        component: resetPass,
        
      
        
    },

    
  ]
});


export default router;



// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import Signup from '../components/Signup.vue';
// import Login from '../components/Login.vue';


// Vue.use(VueRouter);

// const routes = [
//   {
//     path: '/',
//     name: 'signup',
//     component: Signup,
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: Login,
//   },
//   {
//     path: '/forgot-password',
//     name: 'forgot-password',
//     component: ForgotPassword,
//   },
// ];

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes,
// });

// export default router;
