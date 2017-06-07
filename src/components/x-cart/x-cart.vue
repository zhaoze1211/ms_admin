<template>
    <div class="rcart">
        <h2>我的购物车</h2>
        <div class="ct-null" v-if="fmtList.length == 0">
            <div>您的购物车暂时没有商品，立即 <a class="clr-blue" href="javascript:;">登录</a> 查看之前添加的商品。</div>
            <div><a class="clr-blue" href="javascript:;">首页逛逛</a> 挑选喜欢的商品。</div>
        </div>
        <template v-else>
            <r-table :data="fmtList">
                <r-table-column
                        inline-template
                        width="33">
                    <div>
                        <input v-if="row.total_amount == 0" disabled="disabled" v-model="row.checked" type="checkbox"/>
                        <input v-else type="checkbox" v-model="row.checked" @change="reset"/>
                    </div>
                </r-table-column>
                <r-table-column
                        inline-template
                        width="100">
                    <div>
                        <img @click="goUrl('/detail/'+row.id)" class="ctimg cursor" v-lazy="row.pic">
                    </div>
                </r-table-column>
                <r-table-column
                        inline-template
                        label="商品"
                        width="300">
                    <div class="cursor" @click="goUrl('/detail/'+row.id)">{{row.name}}</div>
                </r-table-column>
                <r-table-column
                        inline-template
                        label="商品信息"
                        width="150">
                    <div>
                        <div v-if="row.total_amount == 0" class="ct-over">[已售罄]</div>
                        <div>{{row.product_desc}}</div>
                        <div>{{row.sku_str}}</div>
                    </div>
                </r-table-column>
                <r-table-column
                        inline-template
                        label="单价">
                    <div>￥{{row.price | formatPrice}}</div>
                </r-table-column>
                <r-table-column
                        inline-template
                        label="数量"
                        width="150">
                    <div>
                        <r-input-number v-model="row.count" size="small" @change="handleChange()" :min="1" :max="row.total_amount"></r-input-number>
                    </div>
                </r-table-column>
                <r-table-column
                        inline-template
                        label="优惠">
                    <div>￥{{row.discount | formatPrice}}</div>
                </r-table-column>
                <r-table-column
                        inline-template
                        label="小计">
                    <div>￥{{(row.price-row.discount)*row.count | formatPrice}}</div>
                </r-table-column>
                <r-table-column
                        inline-template
                        label="操作">
                    <div><a href="javascript:;" class="clr-blue" @click="del(row.id,$index)">删除</a></div>
                </r-table-column>
            </r-table>
            <div class="ct-ft">
                <div class="ft-right">
                    <div>已选商品{{totalNum}}件：<span>￥{{totalPrice | formatPrice}}</span></div>
                    <div>已优惠：<span>￥{{totalDiscount | formatPrice}}</span></div>
                    <div class="total">合计（不含运费）：<span>￥{{(totalPrice - totalDiscount) | formatPrice}}</span></div>
                </div>
                <label class="topck"><input type="checkbox" v-model="checkedAll" @change="checkedAllChange"/>全选</label>
                <label><input type="checkbox" v-model="checkedAll" @change="checkedAllChange"/>全选</label>
                <a href="javascript:;" class="clr-blue dltmul" @click="delMul">删除选中项</a>
            </div>
            <div class="btn-block">
                <r-button @click="goUrl('/list')">继续购物</r-button>
                <r-button type="primary" @click="goUrl('/order/createOrder')">去结算</r-button>
            </div>
        </template>

    </div>
</template>
<script>
    import utils from '../../libs/utils.js';
    import constants from '../../libs/constants.js';
    export default {
        mounted: function () {
            this.$nextTick(function () {

            })
        },
        props: {
            list:{
                type:Array,
                default(){
                    return []
                }
            }
         },
        data() {
            return {
                checkedAll: true,
                fmtList:[],
                totalNum:0,
                totalPrice:0,
                totalDiscount:0,
            }
        },
        watch:{
            list(newVal){
                let arr = [],
                    num = 0,
                    price = 0,
                    discount = 0;
                newVal.forEach(function(item){
                    if(item.total_amount == 0){
                        item.checked = false;
                    }else{
                        item.checked = true;
                    }

                    arr.push(item);
                    if(item.checked){
                        num += item.count;
                        price += item.price*item.count;
                        discount += item.discount*item.count;
                    }

                });
                this.totalNum = num;
                this.totalPrice = price;
                this.totalDiscount = discount;
                this.checkedAll = true;

                this.fmtList = arr;
                this.fmtList.splice(0,0);
            }
        },
        methods: {
            checkedAllChange(){
                let checked = this.checkedAll,
                        num = 0,
                        price = 0,
                        discount = 0;
                this.fmtList.forEach(function(item,index){

                    if(item.total_amount == 0){
                        item.checked = false;
                    }else{
                        item.checked = checked;
                    }
                    if(item.checked){
                        num += item.count;
                        price += item.price*item.count;
                        discount += item.discount*item.count;
                    }
                });
                this.totalNum = num;
                this.totalPrice = price;
                this.totalDiscount = discount;
            },
            handleChange(){
                this.reset();
            },
            reset(){
                let that = this,
                     num = 0,
                    price = 0,
                    discount = 0,
                    checkedNum = 0,
                    disabledNum = 0;
                setTimeout(function(){
                    that.fmtList.forEach(function(item){
                        if(item.total_amount == 0){
                            item.checked = false;
                            disabledNum += 1;
                        }
                        if(item.checked){
                            num += item.count;
                            price += item.price*item.count;
                            discount += item.discount*item.count;
                            checkedNum += 1;
                        }
                    });
                    that.totalNum = num;
                    that.totalPrice = price;
                    that.totalDiscount = discount;
                    if(checkedNum == (that.fmtList.length - disabledNum)){
                        that.checkedAll = true;
                    }else{
                        that.checkedAll = false;
                    }
                },100);

            },
            //删除单个
            del(id, index){
                let that = this;
                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$emit("delete",{"type":"single",id:id});
                }).catch(() => {
                    //取消
                });
            },
            //删除选中
            delMul(){
                let that = this,delIds = [];
                that.fmtList.forEach(function(item){
                    if(item.checked){
                        delIds.push(item.id);
                    }
                });
                if(delIds.length == 0){
                    return;
                }
                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$emit("delete",{"type":"single",ids:delIds.join(",")});
                }).catch(() => {
                    //取消
                });
            },
            goUrl(url){
                utils.go(url,this.$router);
            }
        },
        components: {
            "rTable": require("../../components/table/table.vue"),
            "rTableColumn": require("../../components/table/table-column.vue"),
            "rInputNumber": require("../../components/input-number/input-number.vue"),
            "rCheckbox": require("../../components/checkbox/checkbox.vue"),
            "rCheckboxGroup": require("../../components/checkbox/checkbox-group.vue"),
            "rButton": require("../../components/button/button.vue"),
        },
    }
    require("../../assets/styles/components/x-cart.less");
</script>