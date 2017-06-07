<template>
  <div class="rproduct">
    <div class="pdt">
      <div class="pdt-img">
        <div class="ibig"><img :src="bigImg"></div>
        <ul class="ilist">
          <li v-if="index < 5" v-for="(item,index) in img" :class="{'act':active == index}" @mouseenter="changeImg(index)"><img :src="item"></li>
        </ul>
      </div>
      <div class="pdt-info">
        <div class="pdt-tit">{{title}}</div>
        <div class="pdt-oldprice">建议零售价: <span>￥{{oldprice | formatPrice}}</span></div>
        <div class="pdt-price">即时销售价:<span>￥{{price | formatPrice}}</span></div>
        <div class="pdt-slt">
          <div class="slt-item slt-sku">
            <span class="itit">机身颜色</span>
            <ul class="pdt-sku">
              <li @click="selectSku(index,item.stock)" :class="{'sku-act':index == skuindex,'sku-null':item.stock == 0}" v-for="(item,index) in sku"><img :src="item.pic"/><span>{{item.sku_str}}</span></li>
            </ul>
          </div>

          <div class="slt-item">
            <span class="itit">购买数量</span>
            <div class="pdt-num">
              <r-input-number size="small" v-model="buynum" :min="1" :max="stock?stock:1"></r-input-number>
              <span class="pdt-stock">库存{{stock}}件</span>
            </div>
          </div>

          <div>
            <a v-if="stock > 0" class="pdt-buy" @click="addCart" href="javascript:;">放到购物车</a>
            <a v-else class="pdt-buy pdt-buy-none" href="javascript:;">已售罄</a>
          </div>

        </div>
      </div>

    </div>


    <div class="pdt-detail">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  import utils from '../../libs/utils.js';
  export default {
    props: {
      img:{
        type:Array,
        default(){
            return []
        }
      },
      sku:{
        type:Array,
        default(){
          return []
        }
      },
      price:{
        type:Number,
        require:true
      },
      oldprice:{
        type:Number,
        require:true
      },
      title:{
        type:String,
        default:""
      },
      url:{
        type:String,
        default:""
      },
      skuindex:{
        type:Number,
         default:0
      },
      stock:{
        type:Number,
        default:10000
      }
    },
    data() {
      return {
        bigImg:this.img[0],
        active:0,
        buynum:1
      }
    }, 
    mounted: function() {
        this.$nextTick(function() {

        })
     },
    watch:{
      img(newVal){
        this.bigImg = newVal[0];
      },
      skuindex(newVal){
        this.buynum = 1;
      }
    },
    methods: {
      changeImg(index){
        this.active = index;
        this.bigImg = this.img[index];
      },
      selectSku(index,stock){
        if(stock > 0){
          this.$emit("selected",index);
        }
      },
      addCart(){
        this.$emit("buy",{"sku":this.skuindex,"num":this.buynum});
      }
    },
    components: {
      "rInputNumber": require('../../components/input-number/input-number.vue'),
    }
  };
  require("../../assets/styles/components/x-product.less");
</script>