<template>
    <div class="my_order">
        <el-row style='padding: 10px 0;'>
            <el-col :span="9">
                <r-button type="primary" @click.native='toUpdate'>刷新</r-button>
            </el-col>
            <el-col :span="3" style="margin-right: 10px">
                <el-select v-model="dataObj.optionsValue" placeholder="请选择" ref="dataObj">
                    <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="5" style="margin-right: 10px">
                <r-date-picker v-model="dataObj.timeScopes" type="datetimerange" placeholder="申请退款时间范围" ref="dataObj"
                               :editable="false">
                </r-date-picker>
            </el-col>
            <el-col :span="4" style="margin-right: 10px">
                <r-input v-model="dataObj.orderId" placeholder="请输入订单号" :maxlength='20'></r-input>
            </el-col>
            <el-col :span="2">
                <r-button type="primary" icon="search" @click.native='toSearch'>搜索</r-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="orderBigRight  border">
                    <div class="xv-block10">
                        <el-row class='border-b'>
                            <el-col :span="5" class='border-r'>
                                <div class="rightTitle pd-top10 pd-bottom10 pd-left pd-right text-center">
                                    订单编号/申请退款时间
                                </div>
                            </el-col>
                            <el-col :span="4" class='border-r'>
                                <div class="rightTitle pd-top10 pd-bottom10 pd-left pd-right text-center">
                                    商品信息
                                </div>
                            </el-col>
                            <el-col :span="3" class='border-r'>
                                <div class="rightTitle pd-top10 pd-bottom10 text-center">
                                    单价/数量
                                </div>
                            </el-col>
                            <el-col :span="2" class='border-r'>
                                <div class="rightTitle pd-top10 pd-bottom10 text-center">
                                    退款类型
                                </div>
                            </el-col>
                            <el-col :span="2" class='border-r'>
                                <div class="rightTitle pd-top10 pd-bottom10 text-center">
                                    买家电话
                                </div>
                            </el-col>
                            <el-col :span="3" class='border-r'>
                                <div class="rightTitle pd-top10 pd-bottom10 text-center">
                                    退款金额
                                </div>
                            </el-col>
                            <el-col :span="3" class='border-r'>
                                <div class="rightTitle pd-top10 pd-bottom10 text-center">
                                    退款状态
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="rightTitle pd-top10 pd-bottom10 text-center">
                                    操作
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-for='o in orderList' class='orderNumber'>
                        <div class="border-b" v-if='o.xvporderitems'>
                            <r-myorder
                                    v-for='(item,index) in o.xvporderitems'
                                    :order-id='o.order_id'
                                    :create-time='o.create_time'
                                    :customer-service='o.refund_type'
                                    :address-phone='o.user_phone'
                                    :address-name='o.address_name'
                                    :title='item.product_name'
                                    :order-num='o.refund_id'
                                    :pre-price='item.tag_price'
                                    :now-price='item.price'
                                    :count='item.item_count'
                                    :pay-amount='o.pay_amount'
                                    :logistic_fee='o.logistic_fee'
                                    :sku-str='item.sku_str'
                                    :showaction='index'
                                    :ad-status='convertStatus(o.status)'
                                    :btn-text='adStatusView(o.order_status).btnText'
                                    :btn-hide='adStatusView(o.order_status).btnHide'>
                            </r-myorder>
                        </div>

                    </div>
                    <x-datanull msg="暂无信息" v-if='!total' top='0'></x-datanull>

                    <!-- 弹层 -->
                    <r-dialog title="提示" v-model="dialogVisible" size='tiny'>
                        <div>
                            <r-form :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                                <r-form-item label="导入文件" prop="name">
                                    <el-row :gutter="20">
                                        <el-col :span="12" style='position: relative;'>
                                            <form id="fileupload">
                                                <input type="file" name='file' id="file" ref='file'
                                                       accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                       @change='change'>
                                            </form>
                                        </el-col>
                                    </el-row>
                                </r-form-item>
                            </r-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
						  	<r-button type="primary" :disabled="disabled" @click="toImportAjax">开始导入</r-button>
						    <r-button @click="dialogVisible = false">取 消</r-button>
						  </span>
                    </r-dialog>
                    <r-dialog title="提示" v-model="dialogVisible2" size="tiny">
                        <div>{{title}}</div>
                        <div v-for='item in message'>{{item}}</div>
                    </r-dialog>
                </div>
                <!-- 分页 -->
                <div class="xv-block pd" v-if='total>0'>
                    <el-pagination @current-change="handleCurrentChange" :current-page="params.pageNumber"
                                   layout="prev, pager, next, jumper" :total="total" :page-size="params.pageSize">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>

    </div>

</template>
<script>
    import utils from '../../libs/utils.js';
    import constants from '../../libs/constants.js';
    import {
        formatDate,
        parseDate
    } from '../../components/date-picker/util/index';
    export default {
        data() {
            return {
                dataObj: {
                    optionsValue: '', // 全部状态
                    timeScopes: [], // 时间
                    orderId: '' // 订单号
                },
                file: null,
                ruleForm: {
                    name: ''
                },
                rules: {
                    name: [{
                        required: true,
                    }],
                },
                // select
                options: [{
                    value: '',
                    label: '全部状态'
                }, {
                    value: 'TKZ',
                    label: '退款中'
                }, {
                    value: 'TKCG',
                    label: '退款成功'
                }, {
                    value: 'TKSB',
                    label: '退款失败'
                }],
                // 退款,'重复下单/误下单','商品买错了','其它原因'
                Reasons: [{
                    resons: '不想买了',
                    type: 'danger'
                }, {
                    resons: '其它渠道价格更低',
                    type: ''
                }],
                //弹层
                dialogVisible: false,
                dialogVisible2: false,   // 导入后的
                message: '',
                title: '',
                // 分页
                params: {
                    "pageSize": constants.pagination.pageSize,
                    "pageNumber": 1,
                },
                total: 0,
                begintime: "",
                endtime: "",
                disabled: true,
                // 分页
                orderList: [],
                actionUrl: basepath + '/seller/order/file/import' // 批量发货接口
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let that = this;
                that.getList();
            })
        },
        methods: {
            //订单状态
            convertStatus(status){
                return constants.convertStatus(status);
            },
            // 获取订单
            getList() {
                let that = this;
                utils.ajax({
                    url: "/seller/order/refund/query",
                    data: {
                        "page_size": that.params.pageSize, // 后台没有
                        "page_no": that.params.pageNumber, // 后台没有
                        "refund_status": that.dataObj.optionsValue,
                        "order_id": that.dataObj.orderId,
                        "begin": formatDate(that.dataObj.timeScopes[0], "yyyy-MM-dd HH:mm:ss") || "",
                        "end": formatDate(that.dataObj.timeScopes[1], "yyyy-MM-dd HH:mm:ss") || ""
                    },
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            if (res.result) {
                                that.orderList = res.result.list;
                                that.total = parseInt(res.result.total_amount);
                            }
                        }

                    }
                });
            },
            toUpdate() {
                //      	刷新
                this.dataObj.orderId = '';
                this.dataObj.timeScopes = [];
                this.dataObj.optionsValue = '';
                this.getList();
            },
            toImport() {
                // 批量发货订单
                this.dialogVisible = true;
                var obj = document.getElementById('fileupload');     // 重置表单
                if (obj) {
                    obj.reset();
                    this.disabled = true;
                    return;
                }
            },
            adStatusView(state) {
                return constants.adStatusView(state);
            },
            // 分页
            handleCurrentChange(val) {
                this.params.pageNumber = val;
                this.getList();
            },
            toImportAjax() {
                let that = this;
                //用H5的FormData对象对表单数据进行构造
                var formData = new FormData(); //FormData构造器接收的是一个form的DOM对象
                formData.append("file", this.$refs.file.files[0]);

                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    url: basepath + '/seller/order/file/import',
                    type: "POST",
                    data: formData,
                    dataType: "JSON",
                    async: true,
                    //要想用jquery的ajax来提交FormData数据,
                    //则必须要把这两项设为false
                    processData: false,
                    contentType: false,
                    //这里是防表单重复提交,可以忽略
                    beforeSend: function (xhr) {
                        utils.loadingShow();
                    },
                    complete: function (xhr, status) {
                        utils.loadingHide();
                    },
                    error: function (res) {
                        that.$notify.error({
                            title: '错误',
                            message: res.responseText
                        });
                    },
                    success: function (res) {
                        that.dialogVisible = false;   // 上传文件的窗口
                        that.dialogVisible2 = true;   // 导入后的提示语窗口
                        that.title = res.result.headResult.replace("<br/>", "");
                        that.message = res.result.failtureResult.split("<br/>");
                    }
                });
                //阻止表单的提交事件
                return false;
            },
            toSearch() {
                this.orderList = [];
                this.total = 0;
                this.params.pageNumber = 1;    // 重置当前页
                this.getList();
            },
            change(){
                this.disabled = false;

            }
        },
        computed: {
            getTitleHref: function () {
                this.begintime = formatDate(this.dataObj.timeScopes[0], "yyyy-MM-dd HH:mm:ss") || "",
                    this.endtime = formatDate(this.dataObj.timeScopes[1], "yyyy-MM-dd HH:mm:ss") || ""
                return basepath + "/seller/order/file/export?begin=" + this.begintime + "&end=" + this.endtime + "&orders_status=" + this.dataObj.optionsValue
            }
        },
        components: {
            "elMenu": require('../../components/menu/menu.vue'),
            "elSubmenu": require('../../components/menu/submenu.vue'),
            "elMenuItem": require('../../components/menu/menu-item.vue'),
            "elMenuItemGroup": require('../../components/menu/menu-item-group.vue'),
            "rButton": require('../../components/button/button.vue'),
            "rDialog": require('../../components/dialog/dialog.vue'),
            "elRow": require("../../components/row/row.vue"),
            "elCol": require("../../components/col/col.vue"),
            "elPagination": require('../../components/pagination/pagination.vue'),
            "rMyorder": require('../../components/x-myOrder/main-wq.vue'),
            "rDatePicker": require('../../components/date-picker/date-picker.vue'),
            "elSelect": require('../../components/select/select.vue'),
            "elOption": require('../../components/option/option.vue'),
            "rInput": require('../../components/input/input.vue'),
            "rForm": require('../../components/form/form.vue'),
            "rFormItem": require('../../components/form/form-item.vue'),
            "xDatanull": require('../../components/x-datanull/datanull.vue'),

        }
    }
</script>
<style lang="less" scoped>
    @import "../../assets/styles/views/myOrder.less";

    .order_export {
        width: 68px;
        display: inline-block;
        height: 35px;
        color: #fff;
        border-radius: 5px;
        line-height: 35px;
        text-align: center;
        background-color: #e31c2f;
    }
</style>