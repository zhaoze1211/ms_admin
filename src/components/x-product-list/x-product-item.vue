<template>
  <li class="product" @click="goUrl(url)">
    <div class="pdt-wrap">
      <div class="pdt-top"><img v-lazy="img"/></div>
      <div class="pdt-price">
        <span class="pdt-p1">￥<em>{{price | formatPrice}}</em></span>
        <span class="pdt-p2">￥{{oldprice | formatPrice}}</span>
      </div>
      <div class="pdt-tit">{{title}}</div>
    </div>
  </li>
</template>

<script>
  import utils from '../../libs/utils.js';
  export default {
    props: {
      img:{
        type:String,
        default:""
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
      }
    },
    data() {
      return {

      }
    }, 
    mounted: function() {
        this.$nextTick(function() {

        })
     },
    methods: {
      goUrl(url){
        utils.go(url,this.$router);
      }
    },
    components: {

    }
  };
</script>