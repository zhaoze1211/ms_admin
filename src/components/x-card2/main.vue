<template>
  <div class="x-card2">
      <el-row v-if="coverUrl">
        <el-col :span="4">
          <img v-lazy="coverUrl" class="image" style="height: 105px;">
        </el-col>
        <el-col :span="14">
          <div style="padding: 14px;">
            <div class="xv-block10 txt-ofl">{{title}}</div>
            <div class="bottom xv-block10">
              <span>¥{{priceMoney|formatPrice}}</span>
              <span style="padding-left: 40px;">{{fansnum}} </span>
              <span>| {{tag}}</span>
            </div>
            <div class="txt-gray">活动日期：{{activityStartTime | formatTime}}  ~  {{activityEndTime | formatTime}}</div>
          </div>
        </el-col>
        <el-col :span="6">
        	<div class="right">
        		<slot></slot>
        	</div>
        </el-col>
      </el-row>

    </div>
  
</template>

<script>
  export default {
    props: [
      'id',
      'title',
      'coverUrl',
      'priceMoney',
      'fansnum',
      'tag',
      'adStatus',
      'activityEndTime',
      'activityStartTime',
    ],
    methods: {
      
    },
    components: {
        "elRow": require('../../components/row/row.vue'),
        "elCol": require('../../components/col/col.vue'),
      }
  };
  
  require("../../assets/styles/components/xcard.less");
</script>