<template>
  <el-card :body-style="{ padding: '0' }" class='xv-block'>
    <div class="pd">
      <div class="fts-bigger xv-block">{{title}}</div>
      <div class='xv-block' style="padding-bottom: 20px;">
        <div class=" float-left">{{secondLeft}}</div>
        <div class=" float-right">{{secondRight}}</div>
      </div>
      <div>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: [
    	'id',
      'title',
      'secondLeft',
      'secondRight',
    ],
    data() {
      return {}
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

      "elCard": require('../../components/card/main.vue'),
    },

  };
  require("../../assets/styles/common/main.less");
</script>