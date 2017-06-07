<template>
  <div class="rslider" @mouseover="stopAuto" @mouseout="autoPlay" :style="{width:imgWidth+'px'}">
      <div>
          <div class="slider-box" :style="{width:allCount,'-webkit-transition':transitionConfig,'-webkit-transform':slateX}" ref='slider'>
              <slider-item :img="imgList[imgList.length-1].img" :imgWidth="-imgWidth" v-if="loop" @click.native="click(imgList.length-1)"/>
              <slider-item v-for="(item,index) in imgList" :img="item.img" :imgWidth="imgWidth*index" @click.native="click(imgIndex)"/>
              <slider-item :img="imgList[0].img" :imgWidth="imgWidth*imgList.length" v-if="loop" @click.native="click(0)"/>
          </div>
      </div>
      <span class='slider-left' @click="toLeft" v-if="arrow">←</span>
      <span class='slider-right' @click='toRight' v-if="arrow">→</span>
      <div class="slider-dots" v-if="dots">
           <span v-for="(item,index) in imgList.length" :class="{active:index==dotsIndex}" @click="toDots(index)"></span>
      </div>
  </div>
</template>

<script>
import utils from '../../libs/utils.js';
export default {
  props:{
      imgWidth:{
           type:Number,
           default:1200
      },
      imgList:{
           type:Array
      },
      dots:{
           type:Boolean,
           default:true
      },
      arrow:{
           type:Boolean,
           default:true
      },
      initIndex:{
           type:Number,
           default:0
      },
      loop:{
           type:Boolean,
           default:true
      },
      duration:{
           type:Number,
           default:0.3
      },
      auto:{
           type:Boolean,
           default:true
      },
      autoTime:{
           type:Number,
           default:3
      }
  },
  data () {
    return {
       imgIndex:0,
       durationTime:0.2,
       dotsIndex:0,
       autoer:null,
    }
  },
  components:{
      "slider-item": require('./x-slider-item.vue')
  },
  computed:{
      allCount(){
        return (this.imgList.length*this.imgWidth)+'px';
      },
      slateX(){
         return 'translate3d('+(-this.imgIndex*this.imgWidth)+'px,0,0)'
      },
      transitionConfig(){
         return 'all '+this.durationTime+'s';
      },
  },
  methods:{
      toLeft(){
          if(this.loop){
             this.imgIndex--;
             this.dotsIndex--;
             if(this.dotsIndex<=-1) this.dotsIndex=this.imgList.length-1;

             if(this.imgIndex<=-2) this.loopFn('left');

          }
          else {
             if(this.imgIndex==0) return this.dotsIndex=this.imgIndex=this.imgList.length-1;
             this.imgIndex--;
             this.dotsIndex--;

          }

      },
      toRight(){
          if(this.loop){
            // alert(this.loop)

                this.imgIndex++;
                this.dotsIndex++;
                if(this.dotsIndex==this.imgList.length) this.dotsIndex=0;
                if(this.imgIndex==this.imgList.length+1) this.loopFn('right');
          }
          else {
             this.imgIndex++;
             this.dotsIndex++;
             if(this.imgIndex>this.imgList.length-1) return this.dotsIndex=this.imgIndex=0;
          }
      },
      loopFn(type){
          const dur=this.durationTime;
          this.durationTime=0;

          this.imgIndex=type=='right'?0:this.imgList.length-1;

          setTimeout(()=>{
            this.$nextTick(function(){
                 this.durationTime=dur;

                 if(type=='right') this.imgIndex++;
                 else this.imgIndex--;
            })
          },30)
        },
      toDots(index){
          this.dotsIndex=this.imgIndex=index;
      },
      autoPlay(){
           if(this.auto){
               clearInterval(this.autoer);
               this.autoer=setInterval(()=>{
                     this.toRight();
               },this.autoTime*1000)
           }

      },
      stopAuto(){
          if(this.auto) return clearInterval(this.autoer);
      },
      click(index){
          let url = this.imgList[index].url;
          if(url){
              utils.go(url,this.$router);
          }
          this.$emit("click",index);
      }
  },
  created(){
      this.imgIndex=this.dotsIndex=this.initIndex;

      this.durationTime=this.duration;

      if(this.auto) this.autoPlay();
  }

}
require("../../assets/styles/components/x-slider.less");
</script>
