'use strict'
exports.routes = [

    {//登录
        path: '/login',
        name: 'login',
        component: function (resolve) {
            require(['./views/login/login.vue'], resolve);
        }
    },
    {//首页redirect到机器人
        path: '/',
        redirect: '/order/orderList'
    },
    {// 订单
        path: '/order',
        name: 'order',
        component: function (resolve) {
            require(['./views/order/index.vue'], resolve);
        },
        children: [
            {
                path: 'orderList',   //创建订单
                name: 'orderList',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/order/orderList.vue'], resolve);
                }
            },
            {
                path: 'toLookOrder/:id',   //创建订单
                name: 'toLookOrder',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/order/toLookOrder.vue'], resolve);
                }
            }, {
                path: 'wqOrder',   //维权订单
                name: 'wqOrder',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/order/wqOrder.vue'], resolve);
                }
            }, {
                path: 'refundDetail',   //维权订单详情
                name: 'refundDetail',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/order/refundDetail.vue'], resolve);
                }
            }
        ]
    },
    {
        //我的账户
        path: "/account",
        name: "account",
        component: function (resolve) {
            require(['./views/account/index.vue'], resolve);
        },
        children: [
            {
                path: 'account',   //我的账户
                name: 'account',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/account/account.vue'], resolve);
                }
            },
            {
                path: 'detail',   //结算明细
                name: 'detail',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/account/detail.vue'], resolve);
                }
            },{
                path: 'applyTx',   //申请提现
                name: 'applyTx',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/account/applyTx.vue'], resolve);
                }
            },
            {
                path: 'verifyInfo',   //实名认证
                name: 'verifyInfo',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/account/verifyInfo.vue'], resolve);
                }
            },{
                path: 'bindCard',   //绑卡
                name: 'bindCard',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/account/bindCard.vue'], resolve);
                }
            }
        ]
    },
    {
        //商品管理
        path: "/goods",
        name: "goods",
        component: function (resolve) {
            require(['./views/goods/index.vue'], resolve);
        },
        children: [
            {
                path: 'goods',   //我的账户
                name: 'goods',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/goods/goods.vue'], resolve);
                }
            },
            {
                path: 'goodsList',   //结算明细
                name: 'goodsList',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/goods/goodsList.vue'], resolve);
                }
            },{
                path: 'goodsClass',   //申请提现
                name: 'goodsClass',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['./views/goods/goodsClass.vue'], resolve);
                }
            }
        ]
    }
];
