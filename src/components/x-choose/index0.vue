<template>
    <div class="x-choose">
        <el-row>
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
                <div v-for="item in leftArry" @click="groupClick(item)">
                    <el-row class="listLeft">
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

                <el-row class="listRight" v-for="item in rightArry">
                    <el-col :span="12">{{item.name}}</el-col>
                    <el-col :span="12" class="text-right">
                        <el-button type="text" @click="del(item)">移除</el-button>
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

                defaultArry: [],//保存默认数据
                /*searchTxt: '',
                 newList: [],//默认数据
                 rightArry: [],//选中的数组
                 newArry: [],//过滤后的新数组
                 */
                searchTxt: '',
                allArry: [],//左侧数据
                leftArry: [],//左侧数据
                rightArry: [],//右侧数组
                list:[]

            }
        },
        mounted: function () {
            this.$nextTick(function () {
                /*
                 this.newList = this.leftArry;
                 //
                 this.$emit("value", []);
                 */
                this.list = this.data;
                this.leftArry = JSON.parse(JSON.stringify(this.list));
                this.$emit("value", []);
            })
        },
        methods: {
            //搜索
            keyupSearch(){
                /*
                 if (this.newList.length != 0) {
                 let that = this;
                 this.newArry = this.leftArry.filter(function (element, index, array) {
                 if (element.name.indexOf(that.searchTxt) > -1) {
                 return element.name;
                 }
                 });
                 console.log("匹配的数据：", this.newArry)
                 console.log("传过来的数据：", this.leftArry)
                 if (this.newArry.length != 0) {
                 this.newList = this.newArry;
                 } else {
                 let arry = new Array();
                 //console.log(this.defaultArry)
                 for (let obj of this.leftArry) {
                 if (this.leftArry.indexOf(obj) == -1) {
                 arry.push(obj);
                 }
                 }
                 if (arry.length != 0) {
                 this.newList = arry;
                 } else {
                 this.newList = this.leftArry;
                 }
                 }
                 }
                 */
                let that = this;
                console.log("list", this.list)
                let newArry = this.list.filter(function (element, index, array) {
                    if (element.name.indexOf(that.searchTxt) > -1) {
                        return element;
                    }
                });
                console.log("newArry", newArry)
                if (newArry.length != 0) {
                    this.leftArry = newArry;
                } else {
                    console.error("未搜索到数据")
                    this.leftArry = [];
//                    for (let obj of this.data) {
//                        if (this.rightArry.indexOf(obj) == -1) {
//                            this.leftArry.push(obj);
//                        }
//                    }
                }

            },
            //全选
            all(){
                this.rightArry = this.rightArry.concat(this.leftArry);
                this.leftArry.splice(0, this.leftArry.length);
                this.backValue();
            },
            //左边群
            groupClick(obj){
                console.log("111",obj);
                console.log("111",this.list);
                console.log("222",this.list.indexOf(obj));
                this.list.splice(this.list.indexOf(obj), 1);
                this.leftArry.splice(this.leftArry.indexOf(obj), 1);
                this.rightArry.push(obj);
                this.backValue();
                console.log("leftArryClick:",this.leftArry)
            },
            //清空
            clear(){
                this.leftArry = this.rightArry.concat(this.leftArry);
                let temp = this.rightArry.splice(0, this.rightArry.length);
                this.backValue();
            },
            //移除
            del(obj){
                this.rightArry.splice(this.rightArry.indexOf(obj), 1)
                this.list.push(obj);
                this.leftArry.push(obj);
                this.backValue();
            },
            //返回值
            backValue(){
                let arry = [];
                this.rightArry.forEach(function (obj, i) {
                    arry.push(obj.id);
                });
                this.$emit("value", arry);
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
