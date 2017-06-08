<template>
    <div class="goods-goodsAdd">
        <div class="goodsForm">
            <r-form :model="goodsForm" :rules="goodsFormRules" ref="goodsForm" label-width="100px">
                <div class="main">
                    <r-form-item label="商品名称" prop="name">
                        <r-input v-model="goodsForm.name" placeholder="请输入商品名称" :maxlength="50"></r-input>
                    </r-form-item>
                    <r-form-item label="商品副标题" prop="second_title">
                        <r-input v-model="goodsForm.second_title" placeholder="请输入商品副标题" :maxlength="30"></r-input>
                    </r-form-item>
                    <r-form-item label="所属分类" prop="categ_name">
                        <el-row>
                            <el-col :span="21">
                                <el-select v-model="goodsForm.categ_name" placeholder="请选择分类"
                                           @change="categ_nameChange">
                                    <el-option
                                            v-for="item in categoryList"
                                            :label="item.name"
                                            :value="JSON.stringify(item)">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3" class="pd-left">
                                <r-button size="small" @click="addClassBtn">新增分类</r-button>
                            </el-col>
                        </el-row>
                    </r-form-item>
                </div>
                <div class="line pd-top">
                    <div class="main">
                        <r-form-item label="商品封面图" prop="name">
                            <ul class="imgList">
                                <li v-for="(item,index) in goodsForm.pics">
                                    <img :src="item"/>
                                </li>
                                <li v-if="goodsForm.pics.length<5">
                                    <el-upload :action="basepath+'/qiniu/uploadPic'" :show-upload-list="false"
                                               :before-upload="beforeUpload" :on-success="goodsPicSuccess"
                                               multiple>

                                        <img src="../../../static2/upload.jpg"/>
                                        <div class="el-upload__tip" slot="tip">最多5张（建议尺寸640×640）：仅支持jpg、gif、png三种格式。
                                        </div>
                                    </el-upload>
                                </li>
                            </ul>
                        </r-form-item>
                    </div>
                </div>
                <div class="line pd-top">
                    <div class="main">
                        <r-form-item label="商品描述" prop="name">
                            <r-input type="textarea" :rows="4" v-model="goodsForm.name" :maxlength="300"
                                     placeholder="请输入商品描述，可输入300个字"></r-input>
                        </r-form-item>
                        <r-form-item label="商品详情图" prop="name">
                            <ul class="imgList">
                                <li>
                                    <img src="http://www.zhaoze.org/1.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/2.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/3.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/4.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/5.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/1.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/2.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/3.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/4.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/5.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/1.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/2.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/3.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/4.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/5.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/1.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/2.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/3.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/4.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/5.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/1.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/2.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/3.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/4.jpg"/>
                                </li>
                                <li>
                                    <img src="http://www.zhaoze.org/5.jpg"/>
                                </li>
                                <li>
                                    <el-upload action="//jsonplaceholder.typicode.com/posts/">
                                        <img src="../../../static2/upload.jpg"/>
                                        <div class="el-upload__tip" slot="tip">最多30张（建议尺寸640×640）：仅支持jpg、gif、png三种格式。
                                        </div>
                                    </el-upload>
                                </li>
                            </ul>
                        </r-form-item>
                    </div>
                </div>
                <div class="line pd-top">
                    <div class="main">
                        <r-form-item label="商品原价" prop="ccc">
                            <el-row>
                                <el-col :span="15">
                                    <r-input v-model="goodsForm.ccc" placeholder="0.00"></r-input>
                                </el-col>
                            </el-row>
                        </r-form-item>
                        <r-form-item label="商品规格">
                            <div class="sku">
                                <h3 class="pd-left10">默认规格</h3>
                                <div class="skuMain">
                                    <r-form-item label="商品价格" prop="aaa">
                                        <r-input v-model="goodsForm.aaa" placeholder="请输入价格"></r-input>
                                    </r-form-item>
                                    <r-form-item label="商品库存" prop="bbb">
                                        <r-input v-model="goodsForm.bbb" placeholder="请输入库存"></r-input>
                                    </r-form-item>
                                </div>
                            </div>
                            <div class="sku">
                                <h3 class="pd-left10">红色</h3>
                                <div class="skuMain">
                                    <r-form-item label="规格名称" prop="aaa">
                                        <r-input v-model="goodsForm.aaa" placeholder="请输入规格名称"></r-input>
                                    </r-form-item>
                                    <r-form-item label="规格价格" prop="bbb">
                                        <r-input v-model="goodsForm.bbb" placeholder="请输入规格价格"></r-input>
                                    </r-form-item>
                                    <r-form-item label="规格库存" prop="bbb">
                                        <r-input v-model="goodsForm.bbb" placeholder="请输入规格库存"></r-input>
                                    </r-form-item>
                                    <r-form-item label="规格封面图" prop="bbb">
                                        <ul class="imgList">
                                            <li>
                                                <img src="http://www.zhaoze.org/1.jpg"/>
                                            </li>
                                            <li>
                                                <img src="http://www.zhaoze.org/2.jpg"/>
                                            </li>
                                            <li>
                                                <img src="http://www.zhaoze.org/3.jpg"/>
                                            </li>
                                            <li>
                                                <img src="http://www.zhaoze.org/4.jpg"/>
                                            </li>
                                            <li>
                                                <img src="http://www.zhaoze.org/5.jpg"/>
                                            </li>
                                            <li>
                                                <el-upload :action="basepath+'/qiniu/uploadPic'"
                                                           :on-success="handleSuccess">
                                                    <img src="../../../static2/upload.jpg"/>
                                                    <div class="el-upload__tip" slot="tip">
                                                        最多5张（建议尺寸640×640）：仅支持jpg、gif、png三种格式。
                                                    </div>
                                                </el-upload>
                                            </li>
                                        </ul>
                                    </r-form-item>
                                </div>
                            </div>
                            <div class="pd10">
                                <r-button size="small">添加规格</r-button>
                            </div>

                        </r-form-item>
                    </div>
                </div>
                <div class="line pd-top">
                    <div class="main">
                        <r-form-item label="统一运费" prop="ccc">
                            <el-row>
                                <el-col :span="15">
                                    <r-input v-model="goodsForm.ccc" placeholder="0.00"></r-input>
                                </el-col>
                            </el-row>
                        </r-form-item>
                    </div>
                </div>
                <r-form-item>
                    <div class="text-center">
                        <r-button type="primary">保存</r-button>
                        <r-button>取消</r-button>
                    </div>
                </r-form-item>
            </r-form>
            <r-dialog title="新增分类" v-model="dialogAddClass" size="tiny" v-if="dialogAddClass">
                <r-form :model="dialogForm" :rules="dialogFormRules" ref="dialogForm" label-width="100px">
                    <r-form-item label="活动名称" prop="name">
                        <r-input v-model="dialogForm.name" placeholder="10个字以内" :maxlength="10"></r-input>
                    </r-form-item>
                </r-form>
                <span slot="footer" class="dialog-footer">
                    <r-button type="primary" @click="okAddClass">确 定</r-button>
                    <r-button @click="dialogAddClass = false">取 消</r-button>
                  </span>
            </r-dialog>
        </div>
    </div>
</template>

<script>
    import utils from '../../libs/utils.js';
    export default{
        data(){
            return {
                //新增分类
                dialogAddClass: false,//弹窗
                //商品表单
                goodsForm: {
                    name: "",
                    second_title: "",
                    categ_name: "",
                    pics: [],//商品封面图
                },
                //商品表单规则
                goodsFormRules: {
                    name: utils.rules.epy,
                    second_title: utils.rules.epy,
                    categ_name: utils.rules.select,
                },
                categoryList: [],  //商品分类列表
                form: {},
                //新增分类表单
                dialogForm: {
                    name: "",
                },
                //新增分类表单规则
                dialogFormRules: {
                    name: utils.rules.noEmpty,
                },
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.categList();
            })
        },
        methods: {
            //商品分类
            categList(num){
                let that = this;
                utils.ajax({
                    url: "/seller/product/category/list",
                    success: function (res) {
                        if (res.code == "SUCCESS") {
                            that.categoryList = [];
                            res.result.list.forEach(function (obj, i) {
                                that.categoryList.push({name: obj.name, id: JSON.stringify(obj.id)});
                            });
                            if (num) {
                                that.$message({
                                    message: '保存成功',
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
            //分类选择
            categ_nameChange(obj){
                //console.log(obj);
            },
            goodsPicSuccess: function (response, file, fileList) {
                this.goodsForm.pics.push(response.result.url);
                utils.loadingHide();
            },
            handleSuccess: function (response, file, fileList) {
                console.log(response);

            },
            //文件上传中…
            beforeUpload(event, file, fileList){
                utils.loadingShow("文件上传中")
            },
            //新增分类弹窗
            addClassBtn(){
                this.dialogAddClass = true;
            },
            //弹窗
            okAddClass(){
                let that = this;
                that.$refs.dialogForm.validate((valid) => {
                    if (valid) {
                        utils.ajax({
                            url: "/seller/product/category/add",
                            data: {name: that.dialogForm.name},
                            success: function (res) {
                                if (res.code == "SUCCESS") {
                                    that.dialogAddClass = false;
                                    that.categList(true);
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
            }

        },
        components: {
            "elUpload": require('../../components/upload/upload.vue'),
            "rButton": require("../../components/button/button.vue"),
            "rForm": require("../../components/form/form.vue"),
            "rFormItem": require("../../components/form/form-item.vue"),
            "rInput": require('../../components/input/input.vue'),
            "el-select": require('../../components/select/select.vue'),
            "el-option": require("../../components/option/option.vue"),
            "elRow": require("../../components/row/row.vue"),
            "elCol": require("../../components/col/col.vue"),
            "r-dialog": require("../../components/dialog/dialog.vue"),
        }
    }
    //require("../../assets/styles/views/batchExport.less");
</script>
<style lang="less">
    @import "../../assets/styles/views/goods";
</style>
