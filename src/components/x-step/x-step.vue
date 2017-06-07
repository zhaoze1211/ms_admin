<template>
  <div class="rstep" :class="'rstep'+step" :style="{float:float}">
    <ul class="clearfix">
      <li class="s1"><i>1.</i>我的购物车</li>
      <li class="s2"><i>2.</i>确认订单信息</li>
      <li class="s3"><i>3.</i>提交成功</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      step:{
        type:Number,
        default:1
      },
      float:{
        type:String,
        default:"none"
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

    },
    components: {

    }
  };
  require("../../assets/styles/components/x-step.less");
</script>