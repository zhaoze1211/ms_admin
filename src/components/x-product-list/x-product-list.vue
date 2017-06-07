<template>
  <div class="product-list clearfix">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {

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
  require("../../assets/styles/components/x-product-list.less");
</script>