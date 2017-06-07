<script>
  import Emitter from '../../libs/components/mixins/emitter';

  export default {
    name: 'ElRadioGroup',

    componentName: 'ElRadioGroup',

    mixins: [Emitter],

    props: {
      value: [String, Number],
      size: String,
      fill: {
        type: String,
        default: '#57C8F2'
      },
      textColor: {
        type: String,
        default: '#fff'
      }
    },
    watch: {
      value(value) {
        this.$emit('change', value);
        this.dispatch('ElFormItem', 'el.form.change', [this.value]);
      }
    }
  };
  require("../../assets/styles/components/radio.less");
</script>

<template>
  <div class="el-radio-group">
    <slot></slot>
  </div>
</template>
