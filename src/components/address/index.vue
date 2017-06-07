<template>
    <div>
        <el-row>
            <el-col :span="7" style="margin-right: 10px">
                <el-select v-model="pro" @change="changeProvince" placeholder="请选择">
                    <el-option
                            v-for="item in provinceData"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="7" v-if="showCity" style="margin-right: 10px">
                <el-select v-model="cy" @change="changeCity" placeholder="请选择">
                    <el-option
                            v-for="item in cityData"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="7" v-if="showCounty">
                <el-select v-model="co" @change="changeCounty" placeholder="请选择">
                    <el-option
                            v-for="item in countyData"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <input type="hidden" ref="input" :value="value" @input="">
    </div>
</template>

<script>
    import AddressChinaData from '../../libs/list.json';
    export default{
        props: ["province", "city", "county","value"],
        data(){
            return {
                pro: '',//省
                provinceData: [],
                cy: '',//市
                cityData: [],
                co: '',//县
                countyData: [],
                showCity: false,//隐藏市
                showCounty: false,//隐藏县
                bindStatus: false,//绑定状态
                editStatus: false,//编辑状态
                proStatus: false,//省状态
                cityStutus: false,//市状态
                countyStatus: false,//县状态
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                for (let obj of AddressChinaData) {
                    if (!obj.hasOwnProperty("parent")) {
                        this.provinceData.push({label: obj.name, value: obj.value});
                    } else {
                        break;
                    }
                }
                if (this.province && this.city || this.county) {
                    this.showCity = true;//显示市
                    this.pro = this.province;
                    this.cy = this.city;
                    if (this.county) {
                        this.countyStatus = true;
                        this.showCounty = true;//显示县
                        this.co = this.county;
                    }
                    this.bindStatus = true;
                    this.editStatus = true;
                    this.cityStutus = true;
                    this.proStatus = true;
                } else {
                    this.$emit("get-value", [null]);
                }
            })
        },
        methods: {
            //省
            changeProvince(value){
                if (value) {
                    this.cityData = [];//重置市
                    this.countyData = [];//重置县
                    if (!this.bindStatus) {
                        this.proStatus = false;
                        this.cy = "";
                        this.cityStutus = false;
                        this.showCounty = false;//隐藏县
                    } else {
                        value = this.province;
                        this.changeCity(this.city);
                    }
                    let [start,list,len]=["", AddressChinaData, AddressChinaData.length];
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].hasOwnProperty("parent") && list[i].parent == value) {
                            start = i;
                            break;
                        }
                    }
                    for (let obj of list.slice(start, len)) {
                        if (obj.hasOwnProperty("parent") && obj.parent == value) {
                            this.cityData.push({label: obj.name, value: obj.value});
                        } else {
                            break;
                        }
                    }
                    if (this.cityData.length != 0) {
                        this.showCity = true;
                        if (this.editStatus && this.county) {
                            this.$emit("get-value", [this.province, this.city, this.county]);
                        } else if (this.editStatus) {
                            this.$emit("get-value", [this.province, this.city]);
                        } else {
                            this.$emit("get-value", [value, null]);
                        }
                        this.editStatus = false;
                    }
                }
            },
            //市
            changeCity(value){
                if (value) {
                    if (!this.bindStatus) {
                        this.countyStatus = false;
                        this.co = "";
                    }
                    this.bindStatus = false;
                    this.countyData = [];
                    let [start,list,len]=["", AddressChinaData, AddressChinaData.length];
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].hasOwnProperty("parent") && list[i].parent == value) {
                            start = i;
                            break;
                        }
                    }
                    for (let obj of list.slice(start, len)) {
                        if (obj.hasOwnProperty("parent") && obj.parent == value) {
                            this.countyData.push({label: obj.name, value: obj.value});
                        } else {
                            break;
                        }
                    }
                    if (this.countyData.length != 0 && this.countyData[0].label != "--") {
                        this.showCounty = true;
                        if (this.cityStutus) {
                            this.$emit("get-value", [this.province, value, null]);
                        } else {
                            this.$emit("get-value", [this.pro, value, null]);
                        }
                    } else {
                        this.showCounty = false;
                        if (this.cityStutus) {
                            this.$emit("get-value", [this.province, value]);
                        } else {
                            this.$emit("get-value", [this.pro, value]);
                        }
                    }
                }
            },
            //县
            changeCounty(value){
                if (value) {
                    if (this.countyStatus || this.proStatus) {
                        this.$emit("get-value", [this.province, this.city, value]);
                    } else {
                        this.$emit("get-value", [this.pro, this.cy, value]);
                    }

                }
            }
        },
        computed: {},
        components: {
            "elSelect": require("../../components/select/select.vue"),
            "elOption": require("../../components/option/option.vue"),
            "elRow": require("../../components/row/row.vue"),
            "elCol": require("../../components/col/col.vue"),
        }
    }
</script>
