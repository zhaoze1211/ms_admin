<template>
    <div id="wrapper" v-loading.fullscreen.lock="loading.isshow" :element-loading-text="loading.text">
        <el-menu theme="dark" class="el-menu--xv" mode="horizontal" @select="goUrl" :fixed="true" v-if='!headerType'>
            <el-menu-item class="nav-logo" index="/">
                <img src="/static2/adminlogo.png"/></el-menu-item>
        </el-menu>
        <el-menu :default-active="actMenu" class="xv-leftbar" router theme="dark" v-if="!headerType">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/order/orderList">订单列表</el-menu-item>
                    <el-menu-item index="/order/wqOrder">维权订单</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/4">订单列表</el-menu-item>
                    <el-menu-item index="/3">维权订单</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-menu"></i>我的账户</template>
                <el-menu-item-group>
                    <el-menu-item index="/account/account">我的账户</el-menu-item>
                    <el-menu-item index="/2">实名认证</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <div :class="{'main-content':!headerType}">
            <router-view></router-view>
        </div>

    </div>
</template>
<script>
    import utils from '../libs/utils.js'
    export default {
        data() {
            return {}
        },
        computed: {
            loading() {
                return this.$store.state.loading
            },
            headerStep() {
                return this.$route.meta.step ? this.$route.meta.step : 0;
            },
            headerType() {
                let path = this.$route.path;
                if (path == "/register" || path == "/login" || path == "/forget") {
                    return true;
                } else {
                    return false;
                }

            },
            actMenu(){
                let path = this.$route.path;
                if (path.indexOf("/poster/spread") > -1 || path == "/message/look") {
                    path = "/poster/groupList";
                } else if (path == "/account/recharge") {
                    path = "/account/orderList";
                }
                return path;
            }
        },
        methods: {
            goUrl(url) {
                utils.go(url, this.$router);
            },

        },
        components: {
            "rMallHeader": require('../components/x-mall-header/x-mall-header.vue'),
            "elMenu": require('../components/menu/menu.vue'),
            "elMenuItem": require('../components/menu/menu-item.vue'),
            "elSubmenu": require("../components/menu/submenu.vue"),
            "elMenuItemGroup": require("../components/menu/menu-item-group.vue"),
        }
    }
    require('../assets/styles/common/main.less');
    //require("../assets/styles/views/common.less");
</script>
