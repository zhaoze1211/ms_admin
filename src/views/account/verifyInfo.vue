<template>
    <div class="account-verifyInfo">
        <div class="title">
            <div class="left">账户概况&nbsp;>&nbsp;<span>提现</span></div>
        </div>
        <div class="pd-top pd-left">
            设置实名认证及银行提现账号
        </div>
        <div class="pd desc">
            1. 请仔细填写账户信息，如果由于您填写错误导致资金流失，小V铺概不负责；<br>
            2. 只支持提现到银行借记卡，<span style="color: #FF6C60">不支持信用卡和存折</span>，提现审核周期为1~2个工作日；
        </div>
        <div class="verifyForm">
            <r-form :model="verifyForm" :rules="verifyFormRules" ref="verifyForm" label-width="100px">
                <r-form-item label="账户类型" prop="resource">
                    <r-radio-group v-model="verifyForm.type">
                        <r-radio label="1">个人账户</r-radio>
                        <r-radio label="2">对公账户</r-radio>
                    </r-radio-group>
                </r-form-item>
                <div v-if="verifyForm.type==1">
                    <r-form-item label="开卡人姓名" prop="name">
                        <r-input v-model="verifyForm.name" placeholder="请准确填写银行卡开卡人姓名，否则无法提现"
                                 :maxlength="20"></r-input>
                    </r-form-item>
                    <r-form-item label="身分证号" prop="idCode">
                        <r-input v-model="verifyForm.idCode" :maxlength="18"
                                 placeholder="请准确填写银行卡开户证件号，否则无法提现"></r-input>
                    </r-form-item>
                </div>
                <div v-if="verifyForm.type==2">
                    <r-form-item label="开户企业" prop="companyName">
                        <r-input v-model="verifyForm.companyName" placeholder="请准确填写企业全称"
                                 :maxlength="30"></r-input>
                    </r-form-item>
                    <r-form-item label="营业执照号" prop="companyNum">
                        <r-input v-model="verifyForm.companyNum" :maxlength="18"
                                 placeholder="请准确填写营业执照号，否则无法提现"></r-input>
                    </r-form-item>
                </div>
                <r-form-item>
                    <div class="text-center">
                        <r-button type="primary" @click="okVerify" :disabled="rzBtnStatus">实名认证</r-button>
                    </div>
                </r-form-item>
            </r-form>
        </div>
    </div>
</template>

<script>
    import utils from '../../libs/utils.js';
    export default{
        data(){
            return {
                rzBtnStatus: true,//是否禁用实名认证按钮
                verifyForm: {
                    type: "1",//认证类型
                    name: "",//个人姓名
                    idCode: "",//个人身份证号
                    companyName: "",//企业名称
                    companyNum: "",//营业执照号
                },
                //个人验证状态
                name: false,
                idCode: false,
                //企业验证状态
                companyName: false,
                companyNum: false,

                verifyFormRules: {
                    name: [
                        {
                            validator: (rule, value, callback) => {
                                if (value == "") {
                                    this.name = false;
                                    this.check();
                                    callback(new Error('请输入姓名'));
                                } else if (value.indexOf(" ") > -1) {
                                    this.name = false;
                                    this.check();
                                    callback(new Error('不能包含空格'));
                                } else {
                                    this.name = true;
                                    this.check();
                                    callback();
                                }
                            }, trigger: 'change'
                        }
                    ],
                    idCode: [
                        {
                            validator: (rule, value, callback) => {
                                if (value == "") {
                                    this.idCode = false;
                                    callback(new Error('身份证号不可为空'));
                                } else if (!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value)) {
                                    this.idCode = false;
                                    this.check();
                                    callback(new Error('身份证号输入有误'));
                                } else {
                                    this.idCode = true;
                                    this.check();
                                    callback();
                                }
                            }, trigger: 'change'
                        }
                    ],
                    companyName: [
                        {
                            validator: (rule, value, callback) => {
                                if (value == "") {
                                    this.companyName = false;
                                    this.check();
                                    callback(new Error('企业名称不可为空'));
                                } else if (value.indexOf(" ") > -1) {
                                    this.companyName = false;
                                    this.check();
                                    callback(new Error('不能包含空格'));
                                } else {
                                    this.companyName = true;
                                    this.check();
                                    callback();
                                }
                            }, trigger: 'change'
                        }
                    ],
                    companyNum: [
                        {
                            validator: (rule, value, callback) => {
                                if (value == "") {
                                    this.companyNum = false;
                                    this.check();
                                    callback(new Error('营业执照号不可为空'));
                                } else if (!/^[0-9a-zA-Z]{15,18}$/.test(value)) {
                                    this.companyNum = false;
                                    this.check();
                                    callback(new Error('营业执照输入格式有误'));
                                } else {
                                    this.companyNum = true;
                                    this.check();
                                    callback();
                                }
                            }, trigger: 'change'
                        }
                    ]
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {

            })
        },
        methods: {
            //格式验证
            check(){
                if (this.verifyForm.type == 1) {
                    //个人
                    if (this.name && this.idCode) {
                        this.rzBtnStatus = false;
                    } else {
                        this.rzBtnStatus = true;
                    }
                } else {
                    //企业
                    if (this.companyName && this.companyNum) {
                        this.rzBtnStatus = false;
                    } else {
                        this.rzBtnStatus = true;
                    }
                }

            },
            //开始实名认证
            okVerify(){
                let that = this;
                this.$refs.verifyForm.validate((valid) => {
                    if (valid) {
                        if (that.verifyForm.type == 1) {
                            //个人
                            utils.ajax({
                                url: "/seller/account/createPerson",
                                data: {
                                    user_name: that.verifyForm.name,
                                    certificate_type: 0,
                                    certificate_number: that.verifyForm.idCode
                                },
                                success: function (res) {
                                    if (res.code == "SUCCESS") {
                                        that.$message({
                                            message: '恭喜你，实名认证通过。',
                                            type: 'success'
                                        });
                                        setTimeout(function () {
                                            utils.go("/account/bindCard?type=1&name=" + that.verifyForm.name + "&idCode=" + that.verifyForm.idCode, that.$router);
                                        }, 2000)
                                    } else {
                                        that.$notify.error({
                                            title: '错误',
                                            message: res.message
                                        });
                                    }
                                }
                            })
                        } else {
                            //企业
                            utils.ajax({
                                url: "/seller/account/createCompany",
                                data: {
                                    company_name: that.verifyForm.companyName,
                                    buslince: that.verifyForm.companyNum,
                                    //buslince_pic: that.picList[0]
                                },
                                success: function (res) {
                                    if (res.code == "SUCCESS") {
                                        that.$message({
                                            message: '恭喜你，实名认证通过。',
                                            type: 'success'
                                        });
                                        setTimeout(function () {
                                            utils.go("/account/bindCard?type=2&company_name=" + that.verifyForm.companyName + "&buslince=" + that.verifyForm.companyNum, that.$router);
                                        }, 2000)
                                    } else {
                                        that.$notify.error({
                                            title: '错误',
                                            message: res.message
                                        });
                                    }
                                }
                            })
                        }
                    }
                });

            }
        },
        components: {
            "rForm": require("../../components/form/form.vue"),
            "rFormItem": require("../../components/form/form-item.vue"),
            "rInput": require('../../components/input/input.vue'),
            "r-radio-group": require("../../components/radio/radio-group.vue"),
            "r-radio": require("../../components/radio/radio.vue"),
            "rButton": require('../../components/button/button.vue'),
        }
    }
    //require("../../assets/styles/views/batchExport.less");
</script>
<style lang="less">
    @import "../../assets/styles/views/account";
</style>
