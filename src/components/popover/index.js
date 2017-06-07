const Popover = require('./popover.vue');
const directive = require('./directive.js').default;
const Vue = require('vue');

Vue.directive('popover', directive);

/* istanbul ignore next */
Popover.install = function(Vue) {
  Vue.directive('popover', directive);
};
Popover.directive = directive;

module.exports = Popover;
