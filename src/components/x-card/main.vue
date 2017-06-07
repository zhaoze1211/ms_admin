<template>
  <div class="x-card" @click='sdetails'>
    <div class="xv-block">
      <el-card :body-style="{ padding: '0px' }">
        <div class="pore test">
        	<img v-lazy="coverUrl?coverUrl:imgUrl" class="image" :style="{'height':imgWidth}">
        	<div class="msk"></div>
        	<div class='btn' style='position: absolute;top: 0;left: 0;padding: 40%;' v-if="$slots.imgbtncenter || imgbtncenter">
        		 <slot name="imgbtncenter"></slot>
        	</div>
        </div>
        <div style="padding: 14px;">
            <div class="xv-block10 nowrap" v-if='title'>{{title}}</div>
            <div class="xv-block10 txt-ofl">
            	{{priceMoney?"￥"+ priceMoney:priceText}}
            </div>
            <div class="xv-block10 txt-ofl" v-if='fansnum||secondLeft||tag||secondRight'>
              <span> {{fansnum ? fansnum + "粉丝" : secondLeft}}</span>
              <span>{{tag ? "|"+ tag : secondRight}}</span>
            </div>
            <div class="xv-block10">
              <time 
						    :type="nativeType"
						    :class="[
						      color ? 'text--' + color : ''
						    ]"
              	v-if='activityStartTime||graytitle'>
              	{{activityStartTime?"活动日期&nbsp;"+ activityStartTime+"~"+ activityEndTime:graytitle + grayText}}
              </time>
            </div>
            <div class="xv-block10 txt-ofl bold" v-if='officialid'>{{"报名公众号：" + officialid}}</div>
          <div v-if='adStatus'>
          	<el-button 
          	:type='type' 
          	size='block' 
          	@click='btnhander' 
          	:disabled='type=="disabled"?true:false'>
          	{{adStatus}}
          </el-button>
          </div>
          <slot></slot>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: Number,
      title: String,
      coverUrl: String,
      imgUrl: String,
      priceMoney: Number,
      priceText: String,
      graytitle: String,
      grayText: String,
      fansnum: Number,
      secondLeft: String,
      secondRight: String,
      tag: String,
      type: String,
      adStatus: String,
      activityEndTime: Number,
      activityStartTime: Number,
      officialid: String,
      nativeType: String,
      imgbtncenter:String,
      color: {
        type: String,
        default: 'gray'
      },
    },
    data() {
      return {
        imgWidth:''
      }
    }, 
    mounted: function() {
        this.$nextTick(function() {
        	let that = this;
         that.setImgHeight();
        })
     },
    methods: {
      btnhander() {
        this.$emit("btnhander", {
          "id": this.id,
          "adStatus": this.adStatus
        });
      },
      sdetails() {
        this.$emit("sdetails", {
          "id": this.id,
          "adStatus": this.adStatus
        });
      },
      setImgHeight() {
      	if(this.coverUrl){
      		this.imgWidth = $('.test').width()*(3/4) + "px";
      	}else{
      		this.imgWidth = $('.test').width() + "px";
      	}
        
      }
    },
    components: {
      "elCard": require('../../components/card/main.vue'),
      "elButton": require('../../components/button/button.vue'),
    }
  };
  require("../../assets/styles/components/xcard.less");
</script>