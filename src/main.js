'use strict'
import 'babel-polyfill'
import Vue from 'vue';
import VueRouter from 'vue-router';
import routerMap from './routers';
import App from './views/App.vue'
import filters from './libs/filters';
import utils from './libs/utils';
import VueLazyload from 'vue-lazyload';
import store from './vuex/store';
import plugins from './plugins/index.js';

Vue.use(VueRouter);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: utils.defaultImage,
    loading: utils.defaultImage,
    attempt: 1
});

Vue.use(plugins);

//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: routerMap.routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0,y: 0 };
        }
    }
});

//获取当前用户
utils.checkUser();

router.beforeEach((to, from, next) => {
    utils.loadingShow();
    //登录验证
    if(!store.state.user && utils.getSession("adminuser") && utils.getSession("adminuser") != undefined && utils.getSession("adminuser") != "undefined"){
        let u = utils.getSession("adminuser")?JSON.parse(utils.getSession("adminuser")):""
        store.commit("UPDATE_USER",u);
    }
    if (to.matched.some(record => record.meta.auth)) {
        if (!store.state.user) {
            next({
                name: 'login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
    //登录验证 end
});
router.afterEach(route => {
    window.scrollTo(0,0);
    utils.loadingHide();
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
