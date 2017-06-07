<template>
    <div class="layout clearfix">
        <div class="left">
            <h3>我的信息</h3>
            <ul>
                <li @click="myOrder">我的订单</li>
                <li @click="refundOrder">退款订单</li>
                <li @click="address">收货地址</li>
            </ul>
        </div>
        <div class="right">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import utils from '../../libs/utils.js';
    export default{
        data(){
            return {}
        },
        mounted: function () {
            this.$nextTick(function () {

            })
        },
        methods: {
            //我的订单
            myOrder(){
                utils.go("/order/myOrder", this.$router);
            },
            //退款订单
            refundOrder(){
                utils.go("/order/refundOrder", this.$router);
            },
            //收货地址
            address(){
                utils.go("/order/shAddress", this.$router);
            }

        },
        computed: {},
        components: {
            //"elDatePicker": require("../../components/date-picker/date-picker.vue"),
        }
    }
    //require("../../assets/styles/views/wallet.less");
</script>
<style lang="less">
    @import "../../assets/styles/components/layout.less";
</style>
