<template>
    <div class="refundDetail">
        <div class="refundTitle bg-gray clearfix pd-left pd-right">
            <div class="float-left">退款状态</div>
            <div class="float-right">
                <r-button type="text" @click.native="backBtn">返回维权列表 ></r-button>
            </div>
        </div>
        <div class="refundStatus">
            当前退款状态：<span class="status">{{convertStatus(detailObj.status)}}</span>
            <r-button type="warning" size="small" class="repulse" @click.native="noBtn"
                      v-if="showBtn1">拒绝退款
            </r-button>
            <r-button size="small" type="danger" class="mg-left" @click.native="okBtn"
                      v-if="showBtn2">{{okBtnTxt}}
            </r-button>
        </div>
        <div class="refundTitle bg-gray clearfix pd-left pd-right">
            <div class="float-left">退款处理进度</div>
        </div>
        <div class="tkjd">
            <r-table
                    :data="tableData"
                    style="width: 100%">
                <r-table-column
                        prop="create_time"
                        label="处理时间"
                        width="220">
                </r-table-column>
                <r-table-column
                        inline-template
                        prop="operator"
                        label="操作"
                        width="180">
                    <div>
                        <div v-if="row.operator=='USER'">客户</div>
                        <div v-if="row.operator=='SELLER'">商家</div>
                        <div v-if="row.operator=='SYSTEM'">系统</div>
                    </div>
                </r-table-column>
                <r-table-column
                        prop="detail"
                        label="处理信息">
                </r-table-column>
            </r-table>
        </div>
        <div class="refundTitle bg-gray clearfix pd-left pd-right">
            <div class="float-left">退款信息</div>
        </div>
        <div class="tkinfo">
            <div>订单编号：{{detailObj.order_id}}</div>
            <div>退款编号：{{detailObj.id}}</div>
            <div>买家姓名：{{detailObj.user_name}}</div>
            <div>退款金额：<span>￥{{detailObj.amount | formatPrice}}</span></div>
            <div>联系方式：{{detailObj.user_phone}}</div>
            <div>退款原因：{{detailObj.apply_reason}}</div>
            <div>退款类型：{{detailObj.refund_type == 0 ? "仅退款" : "退货退款"}}</div>
        </div>
        <r-dialog title="同意退款" size="tiny" v-model="okTkDialog" v-if="okTkDialog">
            <r-form :model="tkForm" :rules="tkRules" ref="tkForm">
                <r-form-item label="退货地址" prop="address" label-width="100px">
                    <r-input type="textarea" :rows="3" :maxlength="100" v-model="tkForm.address"></r-input>
                </r-form-item>
            </r-form>
            <div slot="footer" class="dialog-footer">
                <r-button type="primary" @click="okTkBtn">同意退款</r-button>
                <r-button @click="okTkDialog = false">取 消</r-button>
            </div>
        </r-dialog>
        <r-dialog title="拒绝退款" size="tiny" v-model="rejectTkDialog" v-if="rejectTkDialog">
            <r-form :model="rejectTkForm" label-position="top" :rules="rejectTkRules" ref="rejectTkForm">
                <r-form-item label="拒绝退款原因：" prop="reason">
                    <r-input type="textarea" :rows="3" placeholder="请填写拒绝退款原因" :maxlength="100"
                             v-model="rejectTkForm.reason"></r-input>
                </r-form-item>
            </r-form>
            <div slot="footer" class="dialog-footer">
                <r-button type="primary" @click="rejectTkBtn">拒绝退款</r-button>
                <r-button @click="rejectTkDialog = false">取 消</r-button>
            </div>
        </r-dialog>
    </div>
</template>

<script>
    import utils from '../../libs/utils.js';
    import constants from '../../libs/constants.js';
    export default{
        data(){
            return {
                showBtn1: false,
                showBtn2: false,
                okBtnTxt: "同意退款",
                tkForm: {
                    address: "",
                },
                tkRules: {
                    address: utils.rules.epy,
                },
                rejectTkDialog: false,
                rejectTkForm: {
                    reason: "",
                },
                rejectTkRules: {
                    reason: utils.rules.epy,
                },
                okTkDialog: false,
                tableData: [],
                detailObj: {},

            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getDetail();
            })
        },
        methods: {
            getDetail(param){
                let that = this;
                utils.ajax({
                    url: "/seller/order/refund/get",
                    data: {
                        refund_id: that.$route.query.refund_id,
                        order_id: that.$route.query.order_id
                    },
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            that.detailObj = res.result;
                            that.detailObj.apply_reason = that.detailObj.apply_reason.replace("发起退款申请，退款原因：", "");
                            that.tableData = that.detailObj.records;
                            if (that.detailObj.status == "DCL" || (that.detailObj.status == "TKTY" && that.detailObj.refund_type == 1 && that.tableData.length >= 4)) {
                                that.showBtn1 = true;
                                that.showBtn2 = true;
                            } else {
                                that.showBtn1 = false;
                                that.showBtn2 = false;
                            }
//                            if (that.detailObj.status == "DCL" || (that.detailObj.status == "TKTY" && that.detailObj.refund_type == 1)) {
//                                that.showBtn2 = true;
//                            } else {
//                                that.showBtn2 = false;
//                            }
                            if (param) {
                                that.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            }
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    }
                })
            },
            //订单状态
            convertStatus(status){
                if (status == "TKTY") {
                    this.okBtnTxt = "确认退款";
                }
                return constants.convertStatus(status);
            },
            //同意退款（弹窗确定）
            okTkBtn(){
                let that = this;
                this.$refs.tkForm.validate((field) => {
                    if (field) {
                        utils.ajax({
                            url: "/seller/order/refund/agree",
                            data: {
                                refund_id: that.detailObj.id,
                                order_id: that.detailObj.order_id,
                                logistics_detail: "退货地址：" + that.tkForm.address
                            },
                            success: function (res) {
                                if (res.code == "SUCCESS") {
                                    that.okTkDialog = false;

                                    that.getDetail(1);
                                } else {
                                    that.$notify.error({
                                        title: '错误',
                                        message: res.message
                                    });
                                }
                            }
                        })
                    }

                });

            },
            //拒绝退款弹窗
            noBtn(){
                let that = this;
                this.$confirm('请确认是否拒绝退款?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.rejectTkForm.reason="";
                    that.rejectTkDialog = true;
                }).catch(() => {

                });
            },
            //拒绝退款
            rejectTkBtn(){
                let that = this;
                that.$refs.rejectTkForm.validate((field) => {
                    if (field) {
                        utils.ajax({
                            url: "/seller/order/refund/reject",
                            data: {
                                refund_id: that.detailObj.id,
                                order_id: that.detailObj.order_id,
                                reject_reason: "拒绝退款,拒绝退款原因：" + that.rejectTkForm.reason
                            },
                            success: function (res) {
                                if (res.code == "SUCCESS") {
                                    that.rejectTkDialog = false;
                                    that.getDetail(1);
                                } else {
                                    that.$notify.error({
                                        title: '错误',
                                        message: res.message
                                    });
                                }
                            }
                        })
                    }
                });

            },
            //同意退款
            okBtn(){
                let that = this;
                //确认退款、退货退款
                if (that.detailObj.status == "TKTY" && that.detailObj.refund_type == 1) {
                    this.$confirm('请确认是否确认退款?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        utils.ajax({
                            url: "/seller/order/refund/confirm",
                            data: {
                                refund_id: that.detailObj.id,
                                order_id: that.detailObj.order_id
                            },
                            success: function (res) {
                                if (res.code == "SUCCESS") {
                                    that.getDetail(1);
                                } else {
                                    that.$notify.error({
                                        title: '错误',
                                        message: res.message
                                    });
                                }
                            }

                        })
                    }).catch(() => {

                    });

                } else {
                    if (that.detailObj.refund_type == 0) {
                        //仅退款
                        this.$confirm('请确认是否同意退款?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            utils.ajax({
                                url: "/seller/order/refund/agree",
                                data: {
                                    refund_id: that.detailObj.id,
                                    order_id: that.detailObj.order_id,
                                },
                                success: function (res) {
                                    if (res.code == "SUCCESS") {
                                        that.getDetail(1);
                                    } else {
                                        that.$notify.error({
                                            title: '错误',
                                            message: res.message
                                        });
                                    }
                                }
                            })
                        }).catch(() => {

                        });
                    } else {
                        //退货退款
                        that.okTkDialog = true;
                    }
                }


            },
            //返回
            backBtn(){
                utils.go("/order/wqOrder", this.$router);
            }
        },
        components: {
            "rButton": require('../../components/button/button.vue'),
            "r-table": require('../../components/table/table.vue'),
            "r-table-column": require('../../components/table/table-column.vue'),
            "r-dialog": require('../../components/dialog/dialog.vue'),
            "r-form": require('../../components/form/form.vue'),
            "r-form-item": require('../../components/form/form-item.vue'),
            "r-input": require('../../components/input/input.vue'),

        }
    }
    //require("../../assets/styles/views/batchExport.less");
</script>
<style lang="less">
    @import "../../assets/styles/views/refundDetail";
</style>
