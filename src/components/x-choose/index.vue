<template>
    <div class="x-choose">
        <el-row v-if="initData">
            <el-col :span="12" class="borderLine">
                <div class="pd-10">
                    <el-input v-model="searchTxt" placeholder="请输入标签和名字进行搜索" @change="keyupSearch"></el-input>
                </div>
                <el-row class="top">
                    <el-col :span="12">通讯录</el-col>
                    <el-col :span="12" class="text-right">
                        <el-button type="text" @click="all">全选</el-button>
                    </el-col>
                </el-row>
                <div v-for="(item,index) in list" @click="groupClick(item,index)">
                    <el-row class="listLeft" v-if="!item.select && item.filter">
                        <el-col :span="24">{{item.name}}</el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="12" class="right">
                <el-row class="top">
                    <el-col :span="12">已经选择</el-col>
                    <el-col :span="12" class="text-right">
                        <el-button type="text" @click="clear">清空</el-button>
                    </el-col>
                </el-row>

                <el-row class="listRight" v-for="(item,index) in list" v-if="item.select">
                    <el-col :span="12">{{item.name}}</el-col>
                    <el-col :span="12" class="text-right">
                        <el-button type="text" @click="del(item,index)">移除</el-button>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import utils from '../../libs/utils.js';
    export default{
        props: ['data'],
        data(){
            return {
                searchTxt: '',
                initData: false,
                list:[]
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let that = this;
                this.data.forEach(function(item,index){
                    item.select = false;
                    item.filter = true;
                    that.list.push(item);
                });
                this.initData = true;
            });
        },
        methods: {
            //搜索
            keyupSearch(){
                let that = this;
                this.list.forEach(function(item,index){
                    if (item.name.indexOf(that.searchTxt) > -1) {
                        item.filter = true;
                    }else{
                        item.filter = false;
                    }
                });
            },
            //全选
            all(){
                let that = this;
                this.list.forEach(function(item,index){
                    if(item.filter){
                        item.select = true;
                        that.list.splice(index,1,item);
                    }
                });
            },
            //左边群
            groupClick(obj,index){
                obj.select = true;
                this.list.splice(index,1,obj);
            },
            //清空
            clear(){
                let that = this;
                this.list.forEach(function(item,index){
                    item.select = false;
                    that.list.splice(index,1,item);
                });
            },
            //移除
            del(obj,index){
                obj.select = false;
                this.list.splice(index,1,obj);
            },
            //返回值
            backValue(){

            },
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
