<template>
    <div class="x-choose">
        <el-row>
            <el-col :span="12" class="borderLine">
                <div class="pd-10">
                    <el-input v-model="searchTxt" placeholder="请输入名字进行搜索" @change="keyupSearch"></el-input>
                </div>
                <el-row class="top">
                    <el-col :span="12">通讯录</el-col>
                    <el-col :span="12" class="text-right">
                        <el-button type="text" @click="all">全选</el-button>
                    </el-col>
                </el-row>
                <div class="hint" v-if="hintShow">没有符合条件的群</div>
                <div class="scrollBar" :style="{height:leftH}">
                    <div v-for="(item,index) in list" @click="groupClick(item,index)">
                        <el-row class="listLeft" v-if="!item.select && item.filter">
                            <el-col :span="24" class="txt-ofl">{{item.name}}</el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="12" class="right">
                <el-row class="top">
                    <el-col :span="12">已经选择</el-col>
                    <el-col :span="12" class="text-right">
                        <el-button type="text" @click="clear">清空</el-button>
                    </el-col>
                </el-row>
                <div class="scrollBar" :style="{height:rightH}">
                    <el-row class="listRight" v-for="(item,index) in list" v-if="item.select">
                        <el-col :span="12" class="txt-ofl">{{item.name}}</el-col>
                        <el-col :span="12" class="text-right">
                            <el-button type="text" @click="del(item,index)">移除</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import utils from '../../libs/utils.js';
    export default{
        props: ['groupData', 'leftH', 'rightH', 'sendGroup'],
        data(){
            return {
                hintShow: false,//是否显示搜索提示
                searchTxt: '',
                initData: false,
                list: []
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.backValue();
            });
        },
        methods: {
            //搜索
            keyupSearch(){
                let that = this;
                let status = true;
                this.list.forEach(function (item, index) {
                    if (item.name.indexOf(that.searchTxt) > -1) {
                        item.filter = true;
                    } else {
                        item.filter = false;
                    }
                });
                for (let obj of this.list) {
                    if (obj.filter) {
                        that.hintShow = false;
                        status = false;
                        return false;
                    }
                }
                if (status) {
                    that.hintShow = true;
                }
            },
            //全选
            all(){
                let that = this;
                this.list.forEach(function (item, index) {
                    if (item.filter) {
                        item.select = true;
                        that.list.splice(index, 1, item);
                    }
                });
                this.$emit("all");
                this.backValue();
            },
            //左边群
            groupClick(obj, index){
                obj.select = true;
                this.list.splice(index, 1, obj);
                this.$emit("add",obj, index);
                this.backValue();
            },
            //清空
            clear(){
                let that = this;
                this.list.forEach(function (item, index) {
                    item.select = false;
                    that.list.splice(index, 1, item);
                });
                this.$emit("clear");
                this.backValue();
            },
            //移除
            del(obj, index){
                obj.select = false;
                this.list.splice(index, 1, obj);
                this.$emit("del",obj,index);
                this.backValue();
            },
            //返回值
            backValue(){
                let arry = [];
                this.list.forEach(function (obj, i) {
                    if (obj.select) {
                        arry.push(obj.id);
                    }
                });
                this.$emit("value", arry);
            },
        },
        watch: {
            groupData: function (arry, oldValue) {
                let that = this;
                arry.forEach(function (item, index) {
                    item.select = false;
                    item.filter = true;
                    that.list.push(item);
                });
                that.initData = true;
            },
            sendGroup: function (arry, oldValue) {
                let that = this;
                //重置开始
                let temp = [];
                this.list.forEach(function (item, index) {
                    item.select = false;
                    item.filter = true;
                    temp.push(item);
                });
                this.list = temp;
                //重置结束

                arry.forEach(function (item, index) {
                    $.each(that.list, function (index, obj) {
                        if (item.id == obj.id) {
                            obj.select = true;
                            that.list.splice(index, 1, obj);
                            return false;
                        }
                    });
                });

                this.backValue();
            }
        },
        computed: {},
        components: {
            "elRow": require("../../components/row/row.vue"),
            "elCol": require("../../components/col/col.vue"),
            "elInput": require("../../components/input/input.vue"),
            "elButton": require("../../components/button/button.vue"),
        }
    }
    require("../../assets/styles/components/x-choose.less");
</script>
