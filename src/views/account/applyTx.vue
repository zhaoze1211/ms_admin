<template>
    <div class="account-applyTx">
        <div class="title clearfix">
            <div class="left">结算信息</div>
            <div class="right">
                <r-button type="text" @click="backBtn">返回我的账户　></r-button>
            </div>
        </div>
        <div class="top pd">
            <div class="tishi"><i class="el-icon-information"></i>温馨提示</div>
            <div class="desc pd-top10">
                1.提现手续费：3元/笔
                <br>2.通道手续费：提现金额的0.6%
                <br>3.提现计算公式：实际提现金额=提现金额-通道手续费-提现手续费
                <br>4.例：申请提现1000元
                <br>5.实际提现金额：1000-1000*0.6%-3=991元
                <br>6.提现周期：T+1个工作日
            </div>
        </div>
        <div class="txForm">
            <r-form :model="txForm" :rules="txRules" ref="txForm" label-width="100px">
                <r-form-item label="提现账户">
                    <div class="inputWidth">
                        <r-input v-model="txForm.accountTxt" class="focus" :readonly="true"></r-input>
                    </div>
                    <div class="float-left" v-if="showSMRZBtn">
                        <r-button type="primary" size="small" @click="trueNmaeRZ">实名认证</r-button>
                    </div>
                    <div class="float-left" v-if="showBindCardBtn">
                        <r-button type="primary" size="small" @click="bindCard">绑定提现账号</r-button>
                    </div>
                    <div v-if="showTxt" class="float-left" style="color: #FF6C60;font-size: 12px">{{hint}}
                    </div>
                </r-form-item>
                <r-form-item label="提现金额" prop="txMoney">
                    <div class="inputWidth">
                        <r-input v-model="txForm.txMoney" :placeholder="'账户余额 '+txForm.maxTxMoney+' 元'"></r-input>
                    </div>
                    <div class="float-left">
                        <r-button size="small" @click="allTx">全部提现</r-button>
                    </div>
                </r-form-item>
                <r-form-item label="提现手续费">
                    <div class="inputWidth">
                        <r-input :value="fenToYuan(txForm.factorage)+' 元'" :disabled="true"></r-input>
                    </div>
                </r-form-item>
                <r-form-item label="实际金额">
                    <div class="inputWidth">
                        <r-input :value="fenToYuan(txForm.practicalMoney)+' 元'" :disabled="true"></r-input>
                    </div>
                </r-form-item>
                <r-form-item label="审核周期">
                    <div class="inputWidth">
                        <r-input v-model="txForm.period" :disabled="true"></r-input>
                    </div>
                </r-form-item>
            </r-form>
            <div style="padding-left: 150px">
                <r-button type="primary" @click="okTx" :disabled="txBtnStatus">确定提现</r-button>&nbsp;&nbsp;&nbsp;&nbsp;<r-button
                    @click="cancel">
                取消
            </r-button>
            </div>
        </div>
    </div>
</template>

<script>
    import utils from '../../libs/utils.js';
    export default{
        data(){
            return {
                hint: "",
                showTxt: false,
                txBtnStatus: true,//提现按钮是否禁用
                showSMRZBtn: false,
                showBindCardBtn: false,
                //验证
                txMoneyStatus: false,
                bindCardStatus: false,
                txForm: {
                    accountTxt: "",//提现账户文本
                    txMoney: "",//提现金额
                    maxTxMoney: "0",//最大提现金额
                    factorage: "0.00",//提现手续费
                    practicalMoney: "0.00",//实际金额
                    period: "T+1个工作日"//审核周期
                },
                txRules: {
                    txMoney: [
                        {
                            validator: (rule, value, callback) => {
                                if (value == "") {
                                    callback(new Error('金额不能为空'));
                                    this.txMoneyStatus = false;
                                    this.check();
                                } else if (!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(value)) {
                                    callback(new Error('金额格式有误且最多输入两位小数'));
                                    this.txMoneyStatus = false;
                                    this.check();
                                } else if (parseFloat(value) > parseFloat(this.txForm.maxTxMoney)) {
                                    callback(new Error('输入金额超过本次可提现金额'));
                                    this.txMoneyStatus = false;
                                    this.check();
                                } else if (value < 100) {
                                    callback(new Error('提现金额需大于100元'));
                                    this.txMoneyStatus = false;
                                    this.check();
                                } else {
                                    //手续费
                                    this.txForm.factorage = value * 0.006 + 3;
                                    this.txForm.practicalMoney = value - this.txForm.factorage;
                                    this.txMoneyStatus = true;
                                    this.check();
                                    callback();
                                }
                            }, trigger: 'change'
                        }
                    ]
                },
                accountInfo: {},
                rzStatus: "",
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let that = this;

                //可提现金额
                utils.ajax({
                    url: "/seller/account/getAccountAmount",
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            let json = res.result;
                            that.txForm.maxTxMoney = utils.formatPrice(json.withdrawals_amount);
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    }
                })
                //认证信息
                utils.ajax({
                    url: "/seller/account/get",
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            if (res.result) {
                                that.txForm.accountTxt = "实名验证已通过";
                                that.showBindCardBtn = true;
                                that.accountInfo = res.result;
                                utils.ajax({
                                    url: "/seller/account/getStoreBankCard",
                                    success: function (response) {
                                        if (response.code == "SUCCESS") {
                                            let json = response.result;
                                            that.txForm.accountTxt = json.bank_name + json.card_no + (that.accountInfo.account_type == 1 ? " (企业)" : " (个人)");
                                            if (res.result.account_type == 1) {
                                                //企业
                                                switch (json.card_auth_status) {
                                                    case "RZZ":
                                                        that.showBindCardBtn = false;
                                                        that.showTxt = true;
                                                        that.hint = "银行账户认证待审核，需要等待1个工作日！";
                                                        break;
                                                    case "RZCG":
                                                        that.showTxt = true;
                                                        that.showBindCardBtn = false;
                                                        that.hint = "提现预计24小时后到账";
                                                        that.bindCardStatus = true;
                                                        break;
                                                    case "RZSB":
                                                        that.showBindCardBtn = true;
                                                        that.showTxt = true;
                                                        that.hint = "银行账户认证失败，请重新编辑提现账号！";
                                                        that.rzStatus = "rzsb";
                                                        break;
                                                }
                                            } else {
                                                that.bindCardStatus = true;
                                                that.showBindCardBtn = false;
                                            }
                                        }
                                    }
                                });
                            } else {
                                that.showSMRZBtn = true;
                                that.txForm.accountTxt = "未实名验证";
                            }
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    }
                });
            })
        },
        methods: {
            //返回
            backBtn(){
                utils.go("/account/account", this.$router);
            },
            //实名认证
            trueNmaeRZ(){
                utils.go("/account/verifyInfo", this.$router);
            },
            //绑定提现账号
            bindCard(){
                if (this.accountInfo.account_type == 0) {
                    //个人
                    utils.go("/account/bindCard?type=1&name=" + this.accountInfo.user_name + "&idCode=" + this.accountInfo.certificate_number, this.$router);
                } else {
                    //企业
                    utils.go("/account/bindCard?type=2&rzStatus=" + this.rzStatus + "&company_name=" + this.accountInfo.company_name + "&buslince=" + this.accountInfo.buslince, this.$router);
                }
            },
            //全部提现
            allTx(){
                this.txForm.txMoney = this.txForm.maxTxMoney;
            },
            //确定提现
            okTx(){
                let that = this;
                this.$refs.txForm.validate((valid) => {
                    if (valid) {
                        utils.ajax({
                            url: "/seller/account/withDrawals",
                            data: {
                                'amount': that.txForm.txMoney * 100,              //    实际提现金额
                                'commission': that.txForm.factorage * 100,        //    手续费
                            },
                            success: function (res) {
                                if (res.code == "SUCCESS") {

                                } else {
                                    that.$notify.error({
                                        title: '错误',
                                        message: res.message
                                    });
                                }
                            }
                        });
                    }
                });
            },
            //取消
            cancel(){
            },
            //分转换成元
            fenToYuan(money){
                return utils.formatPrice(money * 100);
            },
            //验证
            check(){
                if (this.bindCardStatus && this.txMoneyStatus) {
                    this.txBtnStatus = false;
                } else {
                    this.txBtnStatus = true;
                }
            }
        },
        components: {
            "rButton": require('../../components/button/button.vue'),
            "rInput": require('../../components/input/input.vue'),
            "rForm": require("../../components/form/form.vue"),
            "rFormItem": require("../../components/form/form-item.vue"),
        }
    }
</script>
<style lang="less">
    @import "../../assets/styles/views/account";
</style>
