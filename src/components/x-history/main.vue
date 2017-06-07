<template>
	<el-row class='pd xv-block10 bg-white border-r border-t border-b'>
	  <el-col :span="12" class='xv-block10' v-if='num'>共{{num}}个群收到</el-col>
	  <el-col :span="12" class='xv-block10' v-else>{{oneLeft}}</el-col>
	  <el-col :span="12">{{oneRight}}</el-col>
	  <el-col :span="24">
	    <div>{{content}}</div>
	  </el-col>      
	</el-row>
</template>

<script>
  export default {
    props: [
      'id',
      'num',
      'oneLeft',
      'oneRight',
      'content',
    ],
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
      "elRow": require('../../components/row/row.vue'),
      "elCol": require('../../components/col/col.vue'),
    }
  };
</script>