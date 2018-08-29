
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueCsrf from 'vue-csrf'
import VueProgressBar from 'vue-progressbar'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'

export const EventBus = new Vue();

window.axios = axios;

Vue.use(Vuetify);
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(VueCsrf,{
    selector: 'meta[name="csrf-token"]',
    attribute: 'content'
});
Vue.use(VueProgressBar, {
    color: 'rgb(0, 153, 51)',
    failedColor: 'red',
    height: '10px'
});
Vue.use(VueRouter);

Vue.component('login-form', require('./components/LoginForm'));
Vue.component('home-tag', require('./components/HomeTag'));

const routes = [
    {
        path: '/clients_list',
        component: Vue.component('client-list', require('./components/ClientList'))
    },
    {
        path: '/invoices',
        component: Vue.component('invoices', require('./components/InvoicesList'))
    }

];
const router = new VueRouter({
    // mode: 'history',
    routes
});
const app = new Vue({
    router,
    el: '#app'
});
