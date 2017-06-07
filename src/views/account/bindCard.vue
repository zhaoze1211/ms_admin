<template>
    <div class="account-bindCard">
        <div class="title">
            <div class="left">账户概况&nbsp;>&nbsp;<span>提现</span></div>
        </div>
        <div class="pd-top pd-left">
            设置实名认证及银行提现账号
        </div>
        <div class="pd desc">
            1. 请仔细填写账户信息，如果由于您填写错误导致资金流失，小V铺概不负责；<br>
            2. 只支持提现到银行借记卡，<span style="color: #FF6C60">不支持信用卡和存折，</span>提现审核周期为1~2个工作日；
        </div>
        <div class="verifyForm">
            <r-form :model="bindCardForm" :rules="bindCardFormRules" ref="bindCardForm">
                <div v-if="type==1">
                    <r-form-item label="开卡人姓名" prop="name" label-width="100px">
                        <r-input v-model="bindCardForm.name" :disabled="true"></r-input>
                    </r-form-item>
                    <r-form-item label="开户证件号" prop="idCode" label-width="100px">
                        <r-input v-model="bindCardForm.idCode" :disabled="true"></r-input>
                    </r-form-item>
                </div>
                <div v-else>
                    <r-form-item label="开户企业" prop="company_name" label-width="100px">
                        <r-input v-model="bindCardForm.company_name" :disabled="true"></r-input>
                    </r-form-item>
                    <r-form-item label="营业执照号" prop="buslince" label-width="100px">
                        <r-input v-model="bindCardForm.buslince" :disabled="true"></r-input>
                    </r-form-item>
                </div>
                <r-form-item label="发卡银行" prop="bank" label-width="100px">
                    <el-select v-model="bindCardForm.bank" placeholder="请选择发卡银行" @change="bank_nameChange">
                        <el-option
                                v-for="item in bankNameList"
                                :label="item.label"
                                :value="item">
                        </el-option>
                    </el-select>
                </r-form-item>
                <el-row :gutter="15" v-if="showProvince">
                    <el-col :span="14">
                        <r-form-item label="开户所在地" prop="province" label-width="100px">
                            <el-select v-model="bindCardForm.province" placeholder="所在省"
                                       @change="provinceChange">
                                <el-option
                                        v-for="item in provinceList"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </r-form-item>
                    </el-col>
                    <el-col :span="10">
                        <r-form-item prop="city">
                            <el-select v-model="bindCardForm.city" placeholder="所在市" v-if="showCity"
                                       @change="cityChange">
                                <el-option
                                        v-for="item in cityList"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </r-form-item>
                    </el-col>
                </el-row>
                <r-form-item label="开户银行" prop="subBank" label-width="100px" v-if="showSubBankName">
                    <el-select v-model="bindCardForm.subBank" placeholder="请选择所属支行">
                        <el-option
                                v-for="item in subBankList"
                                :label="item.label"
                                :value="item">
                        </el-option>
                    </el-select>
                </r-form-item>
                <r-form-item label="银行卡号" prop="bankNum" label-width="100px">
                    <r-input v-model="bindCardForm.bankNum" placeholder="请输入银行卡号" :maxlength="21"></r-input>
                </r-form-item>
                <r-form-item label="注册手机号" prop="phone" label-width="100px">
                    <r-input v-model="bindCardForm.phone" :disabled="true"></r-input>
                </r-form-item>
                <r-form-item label="验证码" prop="yzm" label-width="100px">
                    <div class="yzm">
                        <r-input v-model="bindCardForm.yzm" :maxlength="6"></r-input>
                        <r-button type="primary" @click="sendCodeBtn" class="sendBtn" :disabled="sendYzmBtn">
                            {{sendBtnTxt}}
                        </r-button>
                    </div>

                </r-form-item>

                <r-form-item>
                    <div class="text-center">
                        <r-button type="primary" @click="bindBtnClick" :disabled="btnStatus">提交审核</r-button>
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
                sendBtnTxt: "发送验证码",//验证码按钮文本
                sendYzmBtn: false,//是否禁用发送验证码
                btnStatus: true,//是否禁用提交审核按钮
                type: this.$route.query.type,
                bindCardForm: {
                    //个人
                    name: "",
                    idCode: "",
                    //企业
                    company_name: "",
                    buslince: "",

                    //公有
                    bank: {},//银行
                    province: {},//省
                    city: {},//市
                    subBank: {},//支行
                    bankNum: "",//银行卡号
                    phone: "",//手机号
                    yzm: "",//验证码
                },
                //验证状态
                bank_nameStatus_c: false,
                provinceStatus_c: false,
                cityStatus_c: false,
                subBankNameStatus_c: false,
                bankNumStatus_c: false,
                yzmStatus_c: false,

                bindCardFormRules: {
                    bank: [
                        {
                            validator: (rule, value, callback) => {
                                if (this.bindCardForm.bank.value == "") {
                                    callback(new Error('请选择发卡银行'));
                                    this.bank_nameStatus_c = false;
                                    this.check();
                                } else {
                                    callback();
                                    this.bank_nameStatus_c = true;
                                    this.check();
                                }
                            }, trigger: 'change'
                        }
                    ],
                    province: [
                        {
                            validator: (rule, value, callback) => {
                                if (this.bindCardForm.province.value == "") {
                                    callback(new Error('请选择省'));
                                    this.provinceStatus_c = false;
                                    this.check();
                                } else {
                                    callback();
                                    this.provinceStatus_c = true;
                                    this.check();
                                }
                            }, trigger: 'change'
                        }
                    ],
                    city: [
                        {
                            validator: (rule, value, callback) => {
                                if (this.bindCardForm.city.value == "") {
                                    callback(new Error('请选择市'));
                                    this.cityStatus_c = false;
                                    this.check();
                                } else {
                                    callback();
                                    this.cityStatus_c = true;
                                    this.check();
                                }
                            }, trigger: 'change'
                        }
                    ],
                    subBank: [
                        {
                            validator: (rule, value, callback) => {
                                if (this.bindCardForm.subBank.value == "") {
                                    callback(new Error('请选择所属支行'));
                                    this.subBankNameStatus_c = false;
                                    this.check();
                                } else {
                                    callback();
                                    this.subBankNameStatus_c = true;
                                    this.check();
                                }
                            }, trigger: 'change'
                        }
                    ],
                    bankNum: [
                        {
                            validator: (rule, value, callback) => {
                                if (this.bindCardForm.bankNum == "") {
                                    callback(new Error('银行卡号不可为空'));
                                    this.bankNumStatus_c = false;
                                    this.check();
                                } else if (!/^\d{15,21}$/.test(value)) {
                                    callback(new Error('银行卡号为15到21个字符，只能输入数字类型'));
                                    this.bankNumStatus_c = false;
                                    this.check();
                                } else {
                                    callback();
                                    this.bankNumStatus_c = true;
                                    this.check();
                                }
                            }, trigger: 'change'
                        }
                    ],
                    yzm: [
                        {
                            validator: (rule, value, callback) => {
                                if (this.bindCardForm.yzm == "") {
                                    callback(new Error('请输入验证码'));
                                    this.yzmStatus_c = false;
                                    this.check();
                                } else {
                                    callback();
                                    this.yzmStatus_c = true;
                                    this.check();
                                }
                            }, trigger: 'change'
                        }
                    ]
                },
                bankNameList: [],//银行名称列表
                showProvince: false,//是否显示省选择
                provinceList: [],//省列表
                showCity: false,//是否显示市选择
                cityList: [],//市列表
                showSubBankName: false,//是否显示支行选择
                subBankList: [],//支行列表
                tempProvinceList: [],//临时省列表
                sn: "",
                isSendCode: false,
                showId: "",
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let that = this;
                //绑定个人实名认证
                that.bindCardForm.name = that.$route.query.name;
                that.bindCardForm.idCode = that.$route.query.idCode;

                //绑定企业实名认证
                that.bindCardForm.company_name = that.$route.query.company_name;
                that.bindCardForm.buslince = that.$route.query.buslince;

                //手机号
                that.bindCardForm.phone = JSON.parse(sessionStorage.adminuser).phone;

                //银行列表
                utils.ajax({
                    url: "/seller/account/getBankInfo",
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            res.result.forEach(function (obj, i) {
                                that.bankNameList.push({value: obj.bankcode, label: obj.bankname});
                            });
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    }
                });

                //省列表
                utils.ajax({
                    url: "/seller/account/getBankCity",
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            res.result.forEach(function (obj, i) {
                                that.tempProvinceList.push({value: obj.code, label: obj.name});
                            })
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    }
                });

                //信息回显
                if (this.$route.query.rzStatus == "rzsb") {
                    utils.ajax({
                        url: "/seller/account/getStoreBankCard",
                        success: function (res) {
                            if (res.code == "SUCCESS") {
                                let json = res.result;
                                that.showId = json.id;
                                that.bindCardForm.company_name = json.company_name;
                                that.bindCardForm.buslince = json.buslince;

                                that.bindCardForm.bank = {value: json.bank_code, label: json.bank_name};
//                                that.bindCardForm.province = {};
//                                that.bindCardForm.city = {};
//                                that.bindCardForm.subBank = {};

//                                that.showProvince = true;
//                                that.showCity = true;
//                                that.showSubBankName = true;
//                                that.bindCardForm.bankNum = "";//银行卡号置空

                                //渲染支行
//                                utils.ajax({
//                                    url: "/seller/account/getBankInfo",
//                                    data: {citycode: that.bindCardForm.city.value, bankcode: that.bindCardForm.bank.value},
//                                    success: function (res) {
//                                        if (res.code == "SUCCESS") {
//                                            that.subBankList = [];
//                                            res.result.forEach(function (obj, i) {
//                                                that.subBankList.push({value: obj.bankcode, label: obj.bankname});
//                                            });
//                                        } else {
//                                            that.$notify.error({
//                                                title: '错误',
//                                                message: res.message
//                                            });
//                                        }
//                                    }
//                                })
                            } else {
                                that.$notify.error({
                                    title: '错误',
                                    message: res.message
                                });
                            }
                        }
                    });
                }
            })
        },
        methods: {
            //选择银行
            bank_nameChange(obj){
                //重置
                this.showProvince = false;
                setTimeout(() => {
                    this.provinceList = [];
                    this.provinceList = JSON.parse(JSON.stringify(this.tempProvinceList));
                    this.showProvince = true;
                }, 300)
                this.showCity = false;
                this.showSubBankName = false;

                //验证
                this.provinceStatus_c = false;
                this.cityStatus_c = false;
                this.subBankNameStatus_c = false;

            },
            //省选择
            provinceChange(obj){
                let that = this;
                that.showCity = false;
                that.showSubBankName = false;
                //验证
                this.cityStatus_c = false;
                this.subBankNameStatus_c = false;
                //渲染市
                utils.ajax({
                    url: "/seller/account/getBankCity",
                    data: {citycode: obj.value},
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            that.cityList = [];
                            res.result.forEach(function (obj, i) {
                                that.cityList.push({value: obj.code, label: obj.name});
                            });
                            that.showCity = true;
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    }
                })
            },
            //市选择
            cityChange(obj){
                let that = this;
                that.showSubBankName = false;
                //验证
                this.subBankNameStatus_c = false;
                //渲染开户行
                utils.ajax({
                    url: "/seller/account/getBankInfo",
                    data: {citycode: obj.value, bankcode: that.bindCardForm.bank.value},
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            that.subBankList = [];
                            res.result.forEach(function (obj, i) {
                                that.subBankList.push({value: obj.bankcode, label: obj.bankname});
                            });
                            that.showSubBankName = true;
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    }
                })
            },
            //验证
            check(){
                if (this.bank_nameStatus_c && this.provinceStatus_c && this.cityStatus_c && this.subBankNameStatus_c && this.bankNumStatus_c && this.yzmStatus_c) {
                    this.btnStatus = false;
                } else {
                    this.btnStatus = true;
                }
            },
            //发送验证码
            sendCodeBtn(){
                let that = this;
                var second = 59;
                that.sendYzmBtn = true;
                utils.ajax({
                    url: "/seller/seller/verify",
                    data: {phone: that.bindCardForm.phone},
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            that.sn = res.result.sn;
                            that.isSendCode = true;
                            that.sendBtnTxt = "已发送(" + second + ")秒";
                            var timer = setInterval(function () {
                                if (second > 1) {
                                    second--;
                                    that.sendBtnTxt = "已发送(" + second + ")秒";
                                } else {
                                    clearInterval(timer);
                                    that.sendBtnTxt = '重新发送';
                                    that.sendYzmBtn = false;
                                }
                            }, 1000);
                        } else {
                            that.sendYzmBtn = false;
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    }
                });

            },
            //提交审核
            bindBtnClick(){
                let that = this;
                this.$refs.bindCardForm.validate((valid) => {
                    if (valid) {
                        let param = {
                            "user_name": that.bindCardForm.name,
                            "certificate_number": that.bindCardForm.idCode,
                            "card_no": that.bindCardForm.bankNum,//银行卡号
                            "bank_code": that.bindCardForm.bank.value,
                            "bank_name": that.bindCardForm.bank.label,
                            "bank_branch_code": that.bindCardForm.subBank.value,
                            "bank_branch_name": that.bindCardForm.subBank.label,
                            "bank_province_code": that.bindCardForm.province.value,
                            "bank_city_code": that.bindCardForm.city.value,
                            "company_name": that.bindCardForm.company_name,
                            "buslince": that.bindCardForm.buslince,
                            "phone": that.bindCardForm.phone,
                            "sn": that.sn,
                            "verfiy_code": that.bindCardForm.yzm,
                            bank_province_name: that.bindCardForm.province.label,
                            bank_city_name: that.bindCardForm.city.label,
                            certificate_type: 0,
                            buslince_pic: "",
                        };
                        if (that.isSendCode) {
                            if (that.$route.query.rzStatus == "rzsb") {
                                param.id = that.showId;
                                utils.ajax({
                                    url: "/seller/account/updateCompanyStoreBankCard",
                                    data: param,
                                    success: function (res) {
                                        if (res.code == "SUCCESS") {
                                            that.$message({
                                                message: '提交成功，请耐心等待认证结果。',
                                                type: 'success'
                                            });
                                            setTimeout(function () {
                                                utils.go("/account/account", that.$router);
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
                                utils.ajax({
                                    url: "/seller/account/addStoreBankCard",
                                    data: param,
                                    success: function (res) {
                                        if (res.code == "SUCCESS") {
                                            that.$message({
                                                message: '提交成功，请耐心等待认证结果。',
                                                type: 'success'
                                            });
                                            setTimeout(function () {
                                                utils.go("/account/account", that.$router);
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
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: "请先发送验证码"
                            });
                        }
                    }
                });
            },
        },
        components: {
            "rForm": require("../../components/form/form.vue"),
            "rFormItem": require("../../components/form/form-item.vue"),
            "rInput": require('../../components/input/input.vue'),
            "rButton": require('../../components/button/button.vue'),
            "el-select": require('../../components/select/select.vue'),
            "el-option": require("../../components/option/option.vue"),
            "elRow": require("../../components/row/row.vue"),
            "elCol": require("../../components/col/col.vue")
        }
    }
</script>
<style lang="less">
    @import "../../assets/styles/views/account";
</style>
