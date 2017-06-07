<template>
    <div>
        <div class="login_top">
            <div class="main">
                <div class="top_left float-left">
                    <img src="/static2/adminlogo.png" style="height: 100%;"/>
                </div>
                <div class="top_right_text">
                    &nbsp;|&nbsp;&nbsp;小V铺商家管理后台
                </div>
            </div>


        </div>
        <div class="main login_pd" :style="{paddingTop:paddingTop}">
            <r-row style='padding-top: 40px;'>
                <r-col :span="8">
                    <div class="login">
                        <div class="main">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                                <el-form-item>
                                    <div>
                                        <img src="/static2/ad.png" style="width: auto;height: 360px;"/>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </r-col>
                <r-col :span="16">
                    <div class="login">
                        <div class="main" @keyup.enter="handleSubmit" style="margin-left: 230px;">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                                     style="border: 1px solid gainsboro;">
                                <div class="desc text-center"
                                     style="padding-top: 20px;padding-bottom: 20px;border-bottom: 1px solid gainsboro;margin-bottom: 20px;">
                                    <b>系统登陆</b></div>
                                <!--<el-form-item style='margin-left: 0;border-bottom: 1px solid gainsboro;'>

                                </el-form-item>-->
                                <el-form-item label="手机号" prop="mobile" style='padding-right: 20px;'>
                                    <el-input v-model="ruleForm.mobile" :maxlength="11" placeholder="请输入手机号"></el-input>
                                </el-form-item>
                                <el-form-item label="登录密码" prop="password" style='padding-right: 20px;'>
                                    <el-input type="password" v-model="ruleForm.password" :maxlength="20"
                                              placeholder="请输入密码"></el-input>
                                </el-form-item>
                                <el-form-item style='padding-right: 20px;'>
                                    <el-button type="danger" @click="handleSubmit" size="block">登录</el-button>
                                    <r-checkbox v-model="checked">记住账号</r-checkbox>
                                    <!--<a href="javascript:;" class="txt-link float-right" @click="forget" style="text-decoration: none">忘记密码</a>-->
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </r-col>
            </r-row>
        </div>

        <div class="footer_fixed">
            <r-row>
                <r-col :span="6">&nbsp;</r-col>
                <r-col :span="12">
                    <r-row>
                        <r-col :span="18">
                            <div class="text-center" style="padding:20px;min-height: 130px;height: auto;">
                                <div class="xv-block10">大连领客科技有限公司辽宁省大连市中山区世纪街2号5层7号</div>
                                <div class="xv-block10">0411－39520321 | info@rongcapital.cn</div>
                                <div>Copyright © 2016-2017 FaceUI design. All rights reserved</div>
                            </div>
                        </r-col>
                        <r-col :span="6">
                            <div class="text-center" style="padding:20px;height: 130px;width: 130px;">
                                <img src="../../assets/images/qr.jpg" style="width: 100%;height: 100%;"/>
                            </div>
                        </r-col>
                    </r-row>
                </r-col>
                <r-col :span="6">&nbsp;</r-col>
            </r-row>
        </div>

    </div>

</template>
<script>
    import utils from '../../libs/utils.js';
    import md5 from 'md5';
    export default {
        data() {
            return {
                ruleForm: {
                    mobile: '',
                    password: '',
                },
                rules: {
                    mobile: utils.rules.mobile,
                    password: utils.rules.noEmpty
                },
                checked: false,
                paddingTop: "100px"
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let that = this;
                if (sessionStorage.ruleForm && sessionStorage.ruleForm != "undefined") {
                    let res = JSON.parse(sessionStorage.ruleForm);
                    that.ruleForm.mobile = res.admmobile; //绑定数据
                }
                this.paddingTop = ($(window).height() - $(".footer_fixed").height() - 500) / 2 + "px";
            })
        },
        methods: {
            //登录
            handleSubmit(ev) {
                let that = this;
                let ruleForm2 = {
                    'phone': that.ruleForm.mobile,
                    'password': that.ruleForm.password
                }
                this.$refs.ruleForm.validate((field) => {
                    if (field) {
                        ruleForm2.password = md5(ruleForm2.password);
                        utils.ajax({
                            url: "/seller/seller/login",
                            data: ruleForm2,
                            success: function (data) {
                                if (that.checked) {
                                    let sessionData = {
                                        "admmobile": ruleForm2.phone
                                    };
                                    sessionStorage.setItem("ruleForm", JSON.stringify(sessionData));
                                }
                                utils.setUser({"phone": ruleForm2.phone});
                                let redirect = decodeURIComponent(that.$route.query.redirect || "/");
                                utils.go(redirect, that.$router);
                            }
                        });
                    }
                });
            },
            //忘记密码
//      forget() {
//        utils.go({
//          name: "forget"
//        }, this.$router);
//      },
//      change() {
//        if(this.checked) {
//          // 勾选
//          localStorage.setItem("ruleForm", JSON.stringify(this.ruleForm));
//        }
//      }
        },
        computed: {},
        components: {
            "elForm": require('../../components/form/form.vue'),
            "elFormItem": require('../../components/form/form-item.vue'),
            "elButton": require('../../components/button/button.vue'),
            "elInput": require('../../components/input/input.vue'),
            "rRow": require("../../components/row/row.vue"),
            "rCol": require("../../components/col/col.vue"),
            "rCheckbox": require("../../components/checkbox/checkbox.vue"),
        }
    }
    require("../../assets/styles/views/login.less");
</script>
<style lang="less">
    .footer_fixed {
        height: 164px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #323333;
        padding: 20px;
        color: #797979;
    }

    @media screen and (min-width: 320px) and (max-width: 1370px) {
        .login .main{padding: 0px !important}
    }
</style>