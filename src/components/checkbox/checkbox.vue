<template>
  <label class="el-checkbox">
    <span class="el-checkbox__input">
      <span class="el-checkbox__inner"
        :class="{
          'is-disabled': disabled,
          'is-checked': isChecked,
          'is-indeterminate': indeterminate,
          'is-focus': focus
        }"
      ></span>
      <input
        v-if="trueLabel || falseLabel"
        class="el-checkbox__original"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="$emit('change', $event)"
        @focus="focus = true"
        @blur="focus = false">
      <input
        v-else
        class="el-checkbox__original"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="$emit('change', $event)"
        @focus="focus = true"
        @blur="focus = false">
    </span>
    <span class="el-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from '../../libs/components/mixins/emitter';

  export default {
    name: 'ElCheckbox',

    mixins: [Emitter],

    componentName: 'ElCheckbox',

    computed: {
      model: {
        get() {
          return this.isGroup ? this.store : this.value;
        },

        set(val) {
          if (this.isGroup) {
            this.dispatch('ElCheckboxGroup', 'input', [val]);
          } else {
            this.$emit('input', val);
          }
        }
      },

      isChecked() {
        if ({}.toString.call(this.model) === '[object Boolean]') {
          return this.model;
        } else if (Array.isArray(this.model)) {
          return this.model.indexOf(this.label) > -1;
        } else if (this.model !== null && this.model !== undefined) {
          return this.model === this.trueLabel;
        }
      },

      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'ElCheckboxGroup') {
            parent = parent.$parent;
          } else {
            this._checkboxGroup = parent;
            return true;
          }
        }
        return false;
      },

      store() {
        return this._checkboxGroup.value;
      }
    },

    props: {
      value: {},
      label: {},
      indeterminate: Boolean,
      disabled: Boolean,
      checked: Boolean,
      name: String,
      trueLabel: [String, Number],
      falseLabel: [String, Number]
    },
    data(){
      return {
        focus:false
      };
    },

    methods: {
      addToStore() {
        if (Array.isArray(this.model)) {
          this.model.indexOf(this.label) === -1 && this.model.push(this.label);
        } else {
          this.model = this.trueLabel || true;
        }
      }
    },

    created() {
      this.checked && this.addToStore();
    }
  };
  require("../../assets/styles/components/checkbox.less");
</script>
