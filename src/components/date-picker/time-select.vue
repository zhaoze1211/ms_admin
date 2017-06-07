<script>
  import Picker from './picker.vue';
  import Panel from './panel/time-select.vue';

  export default {
    mixins: [Picker],

    name: 'ElTimeSelect',

    created() {
    this.type = 'time-select';
    this.panel = Panel;
  }
  };
</script>
