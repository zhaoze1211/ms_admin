<template>
    <div class="friends-list-wrap">
        <div class="friends-list-con" :style="{maxHeight:h}">
            <el-checkbox-group v-model="checkList" @change="getCheckList">
                <div class="cf mg-left-right" v-for="item in list">
                    <div class="friends-left">
                        <el-checkbox :label="item.id+';'+item.name">{{item.name}}</el-checkbox>
                    </div>
                    <div class="friends-right">{{item.date}}</div>
                </div>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>
    import utils from '../../libs/utils.js';
    export default{
        props: ["list", "h", "bind"],
        data(){
            return {
                checkList: []
            }
        },
        mounted: function () {
            this.$nextTick(function () {

            })
        },
        methods: {
            getCheckList(list){
                this.$emit("change", list);
            }
        },
        watch: {
            bind: function (val, oldVal) {
                this.checkList = val;
            }
        },
        computed: {},
        components: {
            "elRow": require("../../components/row/row.vue"),
            "elCol": require("../../components/col/col.vue"),
            "elCheckboxGroup": require("../../components/checkbox/checkbox-group.vue"),
            "elCheckbox": require("../../components/checkbox/checkbox.vue"),
            "elButton": require("../../components/button/button.vue")
        }
    }
    require("../../assets/styles/components/friends.less");
</script>
