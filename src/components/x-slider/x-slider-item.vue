<template>
  <div class="slider-item" :style="{'-webkit-transform':imgLateX}">
      <img :src="img" />
  </div>
</template>

<script>
export default {
  props:{
      img:{
           type:String,
      },
      imgWidth:{
           type:Number,
           default:1200
      }
  },
  data () {
    return {

    }
  },
  computed:{
      imgLateX(){
          return 'translate3d('+(this.imgWidth)+'px,0,0)'
      }
  }
}
</script>
