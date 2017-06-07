<template>
    <div class="account-detail">
        <div class="title clearfix">
            <div class="left">结算信息</div>
            <div class="right">
                <r-button type="text" @click="backBtn">返回我的账户　></r-button>
            </div>

        </div>
        <div class="pd">
            结算单号：{{transfer_id}} &nbsp;&nbsp;结算时间：{{create_time}} &nbsp;&nbsp;结算金额合计：<span
                style="color: #FF6C60">￥{{amount | formatPrice}}</span>
        </div>
        <div class="title clearfix">
            <div class="left">结算明细</div>
        </div>
        <div class="pd">
            <r-table :data="tableData" stripe>
                <r-table-column
                        prop="create_time"
                        label="下单时间">
                </r-table-column>
                <r-table-column
                        prop="order_id"
                        label="订单编号">
                </r-table-column>
                <r-table-column inline-template label="结算金额（元）">
                    <div>+{{row.amount | formatPrice}}</div>
                </r-table-column>
                <r-table-column inline-template label="操作">
                    <div>
                        <r-button type="text" @click="lookOrder(row)">查看订单</r-button>
                    </div>
                </r-table-column>
            </r-table>
            <el-pagination v-if="showPagination" class="pd-top" @current-change="handleCurrentChange"
                           :layout="pagination.layout" :total="pagination.total_amount"
                           :page-size="pagination.pageSize">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import utils from '../../libs/utils.js';
    import constants from '../../libs/constants.js';
    export default{
        data(){
            return {
                transfer_id: this.$route.query.transfer_id,//结算单号
                create_time: this.$route.query.create_time,//结算时间
                amount: this.$route.query.amount,//结算金额合计
                // 分页
                pagination: {
                    total_amount: 0,//总条数
                    pageSize: constants.pagination.pageSize,//每页显示条数
                    layout: constants.pagination.layout,
                },
                showPagination: false,//是否显示分页

                tableData: []
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getList();
            })
        },
        methods: {
            //列表
            getList(index){
                let that = this;
                utils.ajax({
                    url: "/seller/account/balances/detail",
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            let json = res.result;
                            that.tableData = json.list;
                            that.pagination.total_amount = parseInt(json.total_amount);
                            that.showPagination = true;
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    }
                });
            },
            //分页
            handleCurrentChange(currentPage){
                this.getList(currentPage);
            },
            //返回
            backBtn(){
                utils.go("/account/account", this.$router);
            },
            //查看订单
            lookOrder(row){
                window.open("#/order/toLookOrder/" + row.order_id)
            }
        },
        components: {
            "elRow": require("../../components/row/row.vue"),
            "elCol": require("../../components/col/col.vue"),
            "rButton": require('../../components/button/button.vue'),
            "r-table": require('../../components/table/table.vue'),
            "r-table-column": require('../../components/table/table-column.vue'),
            "elPagination": require('../../components/pagination/pagination.vue'),
        }
    }
    //require("../../assets/styles/views/batchExport.less");
</script>
<style lang="less">
    @import "../../assets/styles/views/account";
</style>
