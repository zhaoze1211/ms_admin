<template>
  <div class="rnav" :class="{'rnav-step':step}">
    <div class="ntop">
      <div class="nctn">
        <div class="nrgt">
          <div class="item" @click="goUrl(url.cart)">购物车<span>（{{num}}）</span></div>
          <div class="item" @click="goUrl(url.order)">我的订单</div>
        </div>
        <div v-if="islogin">你好，<span @click="goUrl(url.order)">{{name}}</span><span class="mgl" @click="logout">[退出]</span></div>
        <div v-else>欢迎来到{{name}}<span class="mgl" @click="goUrl(url.login)">[登录]</span> <span @click="goUrl(url.register)">[注册]</span></div>
      </div>
    </div>
    <div class="nmd" v-if="type != 'mini'">
      <div class="nctn">
        <r-step v-if="step" :step="step" float="right"></r-step>
        <img :src="img" @click="goUrl('home')"/>
      </div>
    </div>
    <div class="nbtm" v-if="type != 'mini' && !step">
      <div class="nctn">
        <ul>
          <li @click="goUrl(item.url)" v-for="item in list">{{item.title}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../../libs/utils.js';
  export default {
    props: {
      islogin:{
        type:Boolean,
        default:false
      },
      name: {
        type: String,
        default: ''
      },
      num:{
        type:[String,Number],
        default:0
      },
      step:{
        type:Number,
        default:0
      },
      type:{
        type:String,
        default:''
      },
      url:{
        type:Object,
        default(){
          return {
            login:"login",
            register:"register",
            cart:"cart",
            order:"order/myOrder"
          }
        }
      },
      img:{
        type: String,
        default: ''
      },
      list:{
        type: Array,
        default(){
          return []
        }
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
        url = utils.getUrl(url);
        utils.go(url,this.$router);
      },
      logout(){
        this.$emit('logout');
      }
    },
    components: {
      "rStep": require('../../components/x-step/x-step.vue'),
    }
  };
  require("../../assets/styles/components/x-mall-header.less");
</script>