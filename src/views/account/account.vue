<template>
    <div class="account">
        <r-table :data="tableData1">
            <r-table-column
                    inline-template
                    label="今日收入">
                <div>
                    {{row.today_income_amount | formatPrice}}元
                </div>
            </r-table-column>
            <r-table-column
                    inline-template
                    label="累计收入">
                <div>
                    {{row.income_amount | formatPrice}}元
                </div>
            </r-table-column>
            <r-table-column
                    inline-template
                    label="账户余额">
                <div>
                    {{row.withdrawals_amount | formatPrice}}元 &nbsp;&nbsp;&nbsp;&nbsp;
                    <r-button type="primary" @click="applyTxBtn" size="small">申请提现</r-button>
                </div>
            </r-table-column>
        </r-table>
        <el-row :gutter="10" class="pd-top pd-bottom">
            <el-col :span="13">
                <r-button type="primary" @click.native='refreshBtn'>刷新</r-button>
            </el-col>
            <el-col :span="3">
                <el-select v-model="selectType" placeholder="全部类型">
                    <el-option v-for="item in typeGroup" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="5">
                <r-date-picker v-model="timeScope" type="datetimerange" placeholder="查询时间范围"
                               :editable="false">
                </r-date-picker>
            </el-col>
            <el-col :span="1">
                <r-button type="primary" icon="search" @click.native='tjSearch'>搜索</r-button>
            </el-col>
        </el-row>
        <r-table :data="tableData2" stripe>
            <r-table-column
                    prop="create_time"
                    label="时间">
            </r-table-column>
            <r-table-column
                    prop="transfer_id"
                    label="结算单号">
            </r-table-column>
            <r-table-column label="类型/渠道" inline-template>
                <div>
                    <div>{{row.type == 0 ? "订单入账" : row.status == "TXCG" ? "申请提现" : "提现失败"}}</div>
                    <div>{{typeConvert(row)}}</div>
                </div>
            </r-table-column>
            <r-table-column label="收入（元）" inline-template>
                <div v-if="row.type == 0">
                    <div>+{{row.type == 0 ? fenToYuan(row.amount) : ""}}</div>
                    <div style="color: #ccc;">(含手续费{{row.commission | formatPrice}})</div>
                </div>
            </r-table-column>
            <r-table-column label="支出（元）" inline-template>
                <div v-if="row.type == 1">
                    <div>-{{row.type == 1 ? fenToYuan(row.amount) : ""}}</div>
                    <div style="color: #ccc;">(含手续费{{row.commission | formatPrice}})</div>
                </div>
            </r-table-column>
            <r-table-column label="账号余额" inline-template>
                <div>
                    {{row.acount_amount | formatPrice}}元
                </div>
            </r-table-column>
            <r-table-column label="操作" inline-template>
                <div v-if="row.type==0">
                    <r-button type="text" @click="lookDetail(row)">查看明细</r-button>
                </div>
            </r-table-column>
        </r-table>
        <el-pagination v-if="showPagination" class="pd-top" @current-change="handleCurrentChange"
                       :layout="pagination.layout" :total="pagination.total_amount" :page-size="pagination.pageSize">
        </el-pagination>
    </div>
</template>

<script>
    import utils from '../../libs/utils.js';
    import constants from '../../libs/constants.js';
    import {formatDate, parseDate} from '../../components/date-picker/util/index';
    export default{
        data(){
            return {
                // 分页
                pagination: {
                    total_amount: 0,//总条数
                    pageSize: constants.pagination.pageSize,//每页显示条数
                    layout: constants.pagination.layout,
                },
                showPagination: false,//是否显示分页
                tableData1: [],
                tableData2: [],
                //筛选条件
                selectType: "",
                timeScope: [],
                typeGroup: [
                    {
                        value: '',
                        label: '全部类型'
                    },
                    {
                        value: 'DDRZ',
                        label: '订单入账'
                    }, {
                        value: 'TXCG',
                        label: '申请提现'
                    }, {
                        value: 'TXSB',
                        label: '提现失败'
                    }
                ],
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let that = this;
                utils.ajax({
                    url: "/seller/account/getAccountAmount",
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            let json = res.result;
                            that.tableData1.push({
                                today_income_amount: json.today_income_amount,
                                income_amount: json.income_amount,
                                withdrawals_amount: json.withdrawals_amount
                            })
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    }
                });
                that.getList();
            })
        },
        methods: {
            //列表
            getList(index){
                let that = this;
                utils.ajax({
                    url: "/seller/account/balances/list",
                    data: {
                        page_size: that.pagination.pageSize,
                        page_no: index || 1,
                        begin: formatDate(this.timeScope[0], "yyyy-MM-dd HH:mm:ss"),
                        end: formatDate(this.timeScope[1], "yyyy-MM-dd HH:mm:ss"),
                        status: that.selectType
                    },
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            let json = res.result;
                            that.tableData2 = json.list;
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
            //刷新
            refreshBtn(){
                location.reload();
            },
            //申请提现
            applyTxBtn(){
                utils.go("/account/applyTx", this.$router);
            },
            //条件搜索
            tjSearch(){
                this.showPagination = false;
                this.getList();
            },
            //分页
            handleCurrentChange(currentPage){
                this.getList(currentPage);
            },
            //类型渠道内容显示判断
            typeConvert(row){
                if (row.type == 0) {
                    return "小V铺交易结算";
                } else if (row.type == 1 && row.status == "TXCG") {
                    return row.bank_name + " 尾号" + row.card_no;
                } else if (row.type == 1 && row.status == "TXSB") {
                    return "提现金额退回";
                }
            },
            //分转换成元
            fenToYuan(money){
                return utils.formatPrice(money);
            },
            //查看明细
            lookDetail(obj){
                utils.go("/account/detail?id=" + obj.id + "&transfer_id=" + obj.transfer_id + "&create_time=" + obj.create_time + "&amount=" + obj.amount, this.$router);
            }
        },
        components: {
            "r-table": require('../../components/table/table.vue'),
            "r-table-column": require('../../components/table/table-column.vue'),
            "rButton": require('../../components/button/button.vue'),
            "elRow": require("../../components/row/row.vue"),
            "elCol": require("../../components/col/col.vue"),
            "elSelect": require('../../components/select/select.vue'),
            "elOption": require('../../components/option/option.vue'),
            "rInput": require('../../components/input/input.vue'),
            "rDatePicker": require('../../components/date-picker/date-picker.vue'),
            "elPagination": require('../../components/pagination/pagination.vue'),
        }
    }
</script>

